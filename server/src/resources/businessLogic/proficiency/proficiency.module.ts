import { Module } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';
import { WorkoutModule } from 'src/resources/API/workout/workout.module';
import { ExerciseGroupModule } from 'src/resources/API/exercise-group/exerciseGroup.module';
import { UserModule } from 'src/resources/API/user/user.module';
import { ExerciseModule } from 'src/resources/API/exercise/exercise.module';

@Module({
  providers: [ProficiencyService],
  exports: [ProficiencyService],
  imports: [WorkoutModule, ExerciseModule, ExerciseGroupModule, UserModule],
})
export class ProficiencyModule {}
