import { Injectable } from '@nestjs/common';
import { ProficiencyService } from 'src/resources/businessLogic/proficiency/proficiency.service';
import { SorenessService } from 'src/resources/businessLogic/soreness/soreness.service';
import { ISoreness, IUserAccountSummary, IProficiency } from 'src/common/interfaces';
import { User } from '@prisma/client';
import { UserService } from '../user/user.service';
import { NotFoundException } from '@nestjs/common';
import { WorkoutService } from '../workout/workout.service';
import { ExerciseGroupService } from '../exercise-group/exerciseGroup.service';
 
@Injectable()
export class UserSummaryService {
  constructor(
    private readonly proficiencyService: ProficiencyService,
    private readonly sorenessService: SorenessService,
    private readonly userService: UserService,
    private readonly workoutService: WorkoutService,
    private readonly exerciseGroupService: ExerciseGroupService,
  ) {}
 
  async getAccountSummary(userId: number): Promise<IUserAccountSummary> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID "${userId}" not found`);
    }
    const workouts = await this.workoutService.findAllByUserId(user.id);
    const exerciseGroups = await this.exerciseGroupService.findAll();
    const proficiency: IProficiency[] = await this.proficiencyService.getProficiencyForAllMuscleGroups(user, workouts, exerciseGroups);
    const soreness: ISoreness[] = await this.sorenessService.getSorenessForAllMuscleGroups(user, workouts, exerciseGroups, proficiency);

    return {
      user,
      proficiency,
      soreness,
    };
  }
    
}