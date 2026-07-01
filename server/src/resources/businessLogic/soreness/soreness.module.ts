import { Module } from '@nestjs/common';
import { WorkoutModule } from 'src/resources/API/workout/workout.module';
import { SorenessService } from './soreness.service';
import { ExerciseModule } from 'src/resources/API/exercise/exercise.module';
import { ExerciseGroupModule } from 'src/resources/API/exercise-group/exerciseGroup.module';
import { UserModule } from 'src/resources/API/user/user.module';
import { ProficiencyModule } from '../proficiency/proficiency.module';

@Module({
  providers: [SorenessService],
  imports: [WorkoutModule, ExerciseModule, ExerciseGroupModule, UserModule, ProficiencyModule],
  exports: [SorenessService],
})
export class SorenessModule {}
