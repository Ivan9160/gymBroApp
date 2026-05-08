import { Module } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';
import { WorkoutModule } from 'src/resources/API/workout/workout.module';
import { ExerciseGroupService } from 'src/resources/API/exercise-group/exerciseGroup.service';
import { ExerciseService } from 'src/resources/API/exercise/exercise.service';
import { UserService } from 'src/resources/API/user/user.service';

@Module({
  providers: [ProficiencyService],
  exports: [ProficiencyService],
  imports: [WorkoutModule, ExerciseService, ExerciseGroupService, UserService],
})
export class ProficiencyModule {}
