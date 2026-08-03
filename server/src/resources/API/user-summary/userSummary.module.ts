import { Module } from '@nestjs/common';
import { UserSummaryService } from './userSummary.service';
import { UserSummaryController } from './userSummary.controller';
import { UserModule } from '../user/user.module';
import { SorenessModule } from 'src/resources/businessLogic/soreness/soreness.module';
import { ProficiencyModule } from 'src/resources/businessLogic/proficiency/proficiency.module';
import { WorkoutModule } from '../workout/workout.module';
import { ExerciseGroupModule } from '../exercise-group/exerciseGroup.module';

@Module({
  controllers: [UserSummaryController],
  providers: [UserSummaryService],
  imports: [UserModule, ProficiencyModule, SorenessModule, WorkoutModule, ExerciseGroupModule],
})
export class UserSummaryModule {}
