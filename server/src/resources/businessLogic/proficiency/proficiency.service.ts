import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ProficiencyConfig } from './proficiency.config';
import { IProficiency, ISet, IUserProfile, IWorkout, IExerciseGroup, IUser } from 'src/common/interfaces';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

// Сет, прив'язаний до конкретної групи м'язів з відповідним коефіцієнтом впливу
interface IWeightedSet {
  set: ISet;
  factor: number; // factor саме для цієї групи м'язів (з ExerciseMuscleFactor)
}

@Injectable()
export class ProficiencyService {
  private readonly cacheTTL = ProficiencyConfig.TTL * 60 * 60 * 1000;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  public async getProficiencyForAllMuscleGroups(user: IUser, workouts: IWorkout[], exerciseGroups: IExerciseGroup[]): Promise<IProficiency[]> {
    const cacheKey = `user:${user.id}:proficiency`;
    const cachedProficiency = await this.cacheManager.get<IProficiency[]>(cacheKey);
    if (cachedProficiency) {
      return cachedProficiency;
    }
    return this.calculateAndSaveProficiency(user, workouts, exerciseGroups);
  }

  public async calculateAndSaveProficiency(user: IUser, workouts: IWorkout[], exerciseGroups: IExerciseGroup[]): Promise<IProficiency[]> {
    const userProfile = user?.userProfile;

    if (!userProfile) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }

    if (!userProfile.weight || userProfile.weight <= 0) {
      throw new NotFoundException(`User with ID ${user.id} has an invalid weight for proficiency calculations`);
    }

    const setsByGroup = this.buildSetsByGroup(workouts);

    const result: IProficiency[] = exerciseGroups.map(group => {
      const weightedSetsForGroup = setsByGroup.get(group.id) || [];
      const proficiency = this.calculateProficiencyForMuscleGroup(weightedSetsForGroup, userProfile);
      return {
        id: group.id,
        name: group.name,
        proficiency: parseFloat(proficiency.toFixed(2)),
      };
    });

    const cacheKey = `user:${user.id}:proficiency`;
    try {
      await this.cacheManager.set(cacheKey, result, this.cacheTTL);
    } catch (e) {
      console.error('--- CACHE SET ERROR ---', e);
    }
    return result;
  }

  private buildSetsByGroup(workouts: IWorkout[]): Map<number, IWeightedSet[]> {
    const setsByGroup = new Map<number, IWeightedSet[]>();

    for (const workout of workouts) {
      for (const set of workout.sets) {
        for (const muscleFactor of set.exercise.muscleFactors) {
          const groupId = muscleFactor.exerciseGroupId;
          if (!setsByGroup.has(groupId)) {
            setsByGroup.set(groupId, []);
          }
          setsByGroup.get(groupId)!.push({ set, factor: muscleFactor.factor });
        }
      }
    }

    return setsByGroup;
  }

  private calculateProficiencyForMuscleGroup(weightedSets: IWeightedSet[], profile: IUserProfile): number {
    const averageDecayed1RM = this.calculateAverageDecayed1RMFactor(weightedSets, profile.weight);
    const genderModifier = ProficiencyConfig.GENDER_MODIFIERS[profile.gender as keyof typeof ProficiencyConfig.GENDER_MODIFIERS] || 1.0;
    const standardBodyweightModifier = profile.weight / ProficiencyConfig.STANDARD_BODYWEIGHT;

    const totalProficiency = averageDecayed1RM * genderModifier / standardBodyweightModifier;
    return totalProficiency;
  }

  private calculateAverageDecayed1RMFactor(weightedSets: IWeightedSet[], bodyweight: number): number {
    let totalDecayed1RMFactor = 0;
    let totalWeight = 0;

    const validEntries = weightedSets.filter(
      ({ set }) => set.exercise.benchmark !== null && set.exercise.benchmark > 0
    );

    validEntries.forEach(({ set, factor }) => {
      const setWeight = this.calculateSetRelevanceByTime(set.createdAt);
      const raw1RMFactor = this.calculateRaw1RMFactor(set, bodyweight, factor);
      if (raw1RMFactor !== null) {
        totalDecayed1RMFactor += raw1RMFactor * setWeight;
        totalWeight += setWeight;
      }
    });

    return validEntries.length > 0 && totalWeight > 0 ? totalDecayed1RMFactor / totalWeight : 0;
  }

  private calculateSetRelevanceByTime(date: Date): number {
    const days = (Date.now() - date.getTime()) / (1000 * 3600 * 24);

    if (days <= ProficiencyConfig.GRACE_PERIOD_DAYS) {
      return 1.0;
    }

    const effectiveDays = days - ProficiencyConfig.GRACE_PERIOD_DAYS;
    return ProficiencyConfig.MIN_RESIDUAL_FACTOR + (1 - ProficiencyConfig.MIN_RESIDUAL_FACTOR) * Math.exp(-effectiveDays / ProficiencyConfig.TAU);
  }

  private calculateRaw1RMFactor(set: ISet, bodyweight: number, factor: number): number | null {
    if (set.exercise.benchmark === null || set.exercise.benchmark <= 0) {
      return null;
    }

    const effectiveWeight = set.exercise.isBodyweight
      ? (bodyweight + set.weight)
      : set.weight;

    const oneRM = effectiveWeight * (1 + set.reps / 30);
    const divider = set.exercise.benchmark + (set.exercise.isBodyweight ? bodyweight : 0);

    return (oneRM * factor) / divider;
  }
}