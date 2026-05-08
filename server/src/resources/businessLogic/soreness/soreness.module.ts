import { Module } from '@nestjs/common';
import { ProficiencyService } from '../proficiency/proficiency.service';
import { WorkoutModule } from 'src/resources/API/workout/workout.module';
import { ExerciseGroupService } from 'src/resources/API/exercise-group/exerciseGroup.service';
import { ExerciseService } from 'src/resources/API/exercise/exercise.service';
import { UserService } from 'src/resources/API/user/user.service';
import { SorenessService } from './soreness.service';

@Module({
  providers: [SorenessService],
  imports: [WorkoutModule, ExerciseService, ExerciseGroupService, UserService, ProficiencyService],
  exports: [SorenessService],
})
export class SorenessModule {}
