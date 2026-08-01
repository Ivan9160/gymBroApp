import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ProficiencyConfig } from './proficiency.config';
import { WorkoutService } from 'src/resources/API/workout/workout.service';
import { ExerciseGroupService } from 'src/resources/API/exercise-group/exerciseGroup.service';
import { UserService } from 'src/resources/API/user/user.service';
import { IProficiency, ISet, IUserProfile } from 'src/common/interfaces';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';


@Injectable()
export class ProficiencyService {
  private readonly cacheTTL = ProficiencyConfig.TTL * 60 * 60 * 1000; // Convert hours to milliseconds for cache TTL
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly exerciseGroupService: ExerciseGroupService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

   public async getProficiencyForAllMuscleGroups(userId: number): Promise<IProficiency[]>  {
    const cacheKey = `user:${userId}:proficiency`;
    const cachedProficiency = await this.cacheManager.get<IProficiency[]>(cacheKey);
    if (cachedProficiency) {
      return cachedProficiency;
    }
    return this.calculateAndSaveProficiency(userId);


    
  }
  public async calculateAndSaveProficiency(userId: number): Promise<IProficiency[]> {
    console.log('STEP 1: method called', userId);
    const sinceDate = new Date();
    sinceDate.setDate(sinceDate.getDate() - ProficiencyConfig.RELEVANT_DATA_DAYS);
    const [allGroups, workouts, user] = await Promise.all([
      this.exerciseGroupService.findAll(),
      this.workoutService.findAllByUserId(userId, { since: sinceDate }),
      this.userService.findById(userId)
    ]);

    const userProfile = user?.userProfile;

    if (!userProfile) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if(!userProfile.weight || userProfile.weight <= 0) {
      throw new NotFoundException(`User with ID ${userId} has an invalid weight for proficiency calculations`);
    }

    const setsByGroup = new Map<number, ISet[]>();
    for (const workout of workouts){
      for (const set of workout.sets) {
        const groupId = set.exercise.exerciseGroupId;
        if (!setsByGroup.has(groupId)) {
          setsByGroup.set(groupId, []);
        }
        setsByGroup.get(groupId)!.push(set);
      }
    }


    const result: IProficiency[] =  allGroups.map(group => {
        const setsForGroup = setsByGroup.get(group.id) || [];
        const proficiency = this.calculateProficiencyForMuscleGroup(setsForGroup, userProfile);
        return {
          id: group.id,
          name: group.name,
          proficiency: parseFloat(proficiency.toFixed(2))
        }

      });
    const cacheKey = `user:${userId}:proficiency`;
    try {
      await this.cacheManager.set(cacheKey, result, this.cacheTTL);
    } catch (e) {
      console.error('--- CACHE SET ERROR ---', e);
    }
    return result;
  }


  private calculateProficiencyForMuscleGroup(sets: ISet[], profile: IUserProfile): number {
    const averageDecayed1RM = this.calculateAverageDecayed1RMFactor(sets, profile.weight);
    const genderModifier = ProficiencyConfig.GENDER_MODIFIERS[profile.gender as keyof typeof ProficiencyConfig.GENDER_MODIFIERS] || 1.0;
    const standardBodyweightModifier = profile.weight / ProficiencyConfig.STANDARD_BODYWEIGHT;

    const totalProficiency = averageDecayed1RM * genderModifier / standardBodyweightModifier;
    return totalProficiency;
  }

  private calculateAverageDecayed1RMFactor(sets: ISet[], bodyweight: number): number {
    let totalDecayed1RMFactor = 0;
    let totalWeight = 0;
    const validSets = sets.filter(set => set.exercise.benchmark !== null && set.exercise.benchmark > 0);

    validSets.forEach(set => {
      const setWeight = this.calculateSetRelevanceByTime(set.createdAt);
      const raw1RMFactor = this.calculateRaw1RMFactor(set, bodyweight);
      if (raw1RMFactor !== null) {
        totalDecayed1RMFactor += (raw1RMFactor * setWeight);
        totalWeight += setWeight;
      }
    });

    return validSets.length > 0 ? totalDecayed1RMFactor / totalWeight : 0;
  }


  private calculateSetRelevanceByTime(date: Date): number {  // Calculate the relevance of a set based on its age, using an exponential decay model
    const days = (Date.now() - date.getTime()) / (1000 * 3600 * 24);

    if (days <= ProficiencyConfig.GRACE_PERIOD_DAYS) {
      return 1.0; 
    }

    const effectiveDays = days - ProficiencyConfig.GRACE_PERIOD_DAYS;
    return ProficiencyConfig.MIN_RESIDUAL_FACTOR + (1 - ProficiencyConfig.MIN_RESIDUAL_FACTOR) * Math.exp(-effectiveDays / ProficiencyConfig.TAU);
  }

  private calculateRaw1RMFactor(set: ISet, bodyweight: number): number | null {  // Calculate the one-rep max factor for a set, considering bodyweight and exercise benchmark
    if (set.exercise.benchmark === null || set.exercise.benchmark <= 0) {
        return null; 
      }

    const effectiveWeight = set.exercise.isBodyweight 
      ? (bodyweight + set.weight) 
      : set.weight;

    const oneRM = effectiveWeight * (1 + set.reps / 30);
    const divider = set.exercise.benchmark + (set.exercise.isBodyweight ? bodyweight : 0);
    
    return (oneRM*set.exercise.factor) / divider;

  }
  
}