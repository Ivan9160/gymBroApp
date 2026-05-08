import { Injectable } from '@nestjs/common';
import { ProficiencyConfig } from './proficiency.config';
import { WorkoutService } from 'src/resources/API/workout/workout.service';
import { ExerciseGroupService } from 'src/resources/API/exercise-group/exerciseGroup.service';
import { UserService } from 'src/resources/API/user/user.service';

@Injectable()
export class ProficiencyService {
  constructor(
    private readonly workoutService: WorkoutService,
    private readonly exerciseGroupService: ExerciseGroupService,
    private readonly userService: UserService
  ) {}

   public async getProficiencyForAllMuscleGroups(userId: number): Promise<any>  {
    const allGroups = await this.exerciseGroupService.findAll();
    const workouts = await this.workoutService.findAllByUserId(userId);
    const userProfile = await this.userService.findById(userId);
    return allGroups.map(group => {
        const setsForGroup = workouts.flatMap(workout=>
          workout.sets.filter(set=> set.exercise.exerciseGroupId === group.id)
        )
        const proficiency = this.calculateProficiencyForMuscleGroup(setsForGroup, userProfile);
        return {
          id: group.id,
          name: group.name,
          proficiency: parseFloat(proficiency.toFixed(2))
        }

      });
  }

  public calculateProficiencyForMuscleGroup(sets: any[], profile: any) {
    const averageDecayed1RM = this.calculateAverageDecayed1RMFactor(sets, profile.weight);
    const genderModifier = ProficiencyConfig.GENDER_MODIFIERS[profile.gender] || 1.0;
    const standardBodyweightModifier = profile.weight / ProficiencyConfig.STANDARD_BODYWEIGHT;

    const totalProficiency = averageDecayed1RM * genderModifier / standardBodyweightModifier;
    return totalProficiency;
  }

  public calculateAverageDecayed1RMFactor(sets: any[], bodyweight: number): number {
    let totalDecayed1RMFactor = 0;
    let count = 0;

    sets.forEach(set => {
      const decay = this.calculateDecay(set.createdAt);
      const decayed1RMFactor = this.calculateDecayed1RMFactor(set, decay, bodyweight);
      totalDecayed1RMFactor += decayed1RMFactor;
      count++;
    });

    return count > 0 ? totalDecayed1RMFactor / count : 0;
  }


  private calculateDecay(date: Date): number {
    const days = (Date.now() - date.getTime()) / (1000 * 3600 * 24);
    if (days <= 14) return 1.0;
    if (days >= 90) return 0.5;
    return 1.0 - ((days - 14) / (90 - 14)) * 0.5;
  }

  private calculateDecayed1RMFactor(set: any, decay: number, bodyweight: number): number {
    const effectiveWeight = set.exercise.isBodyweight 
      ? (bodyweight + set.weight) 
      : set.weight;

    const oneRM = effectiveWeight * (1 + set.reps / 30);
    const divider = set.exercise.benchmark + (set.exercise.isBodyweight ? bodyweight : 0);
    
    const decayed1RM = oneRM * decay * set.exercise.factor / divider;
    return decayed1RM;

  }
  
}