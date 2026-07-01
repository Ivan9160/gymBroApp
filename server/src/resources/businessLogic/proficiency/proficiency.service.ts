import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ProficiencyConfig } from './proficiency.config';
import { WorkoutService } from 'src/resources/API/workout/workout.service';
import { ExerciseGroupService } from 'src/resources/API/exercise-group/exerciseGroup.service';
import { UserService } from 'src/resources/API/user/user.service';
import { ISet, IUserProfile } from 'src/common/interfaces';

@Injectable()
export class ProficiencyService {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly exerciseGroupService: ExerciseGroupService,
    private readonly userService: UserService
  ) {}

   public async getProficiencyForAllMuscleGroups(userId: number): Promise<any>  {
    const [allGroups, workouts, user] = await Promise.all([
      this.exerciseGroupService.findAll(),
      this.workoutService.findAllByUserId(userId),
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


    
    return allGroups.map(group => {
        const setsForGroup = setsByGroup.get(group.id) || [];
        const proficiency = this.calculateProficiencyForMuscleGroup(setsForGroup, userProfile);
        return {
          id: group.id,
          name: group.name,
          proficiency: parseFloat(proficiency.toFixed(2))
        }

      });
  }

  public calculateProficiencyForMuscleGroup(sets: ISet[], profile: IUserProfile): number {
    const averageDecayed1RM = this.calculateAverageDecayed1RMFactor(sets, profile.weight);
    const genderModifier = ProficiencyConfig.GENDER_MODIFIERS[profile.gender as keyof typeof ProficiencyConfig.GENDER_MODIFIERS] || 1.0;
    const standardBodyweightModifier = profile.weight / ProficiencyConfig.STANDARD_BODYWEIGHT;

    const totalProficiency = averageDecayed1RM * genderModifier / standardBodyweightModifier;
    return totalProficiency;
  }

  public calculateAverageDecayed1RMFactor(sets: ISet[], bodyweight: number): number {
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