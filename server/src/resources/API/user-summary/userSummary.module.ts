import { Module } from '@nestjs/common';
import { UserSummaryService } from './userSummary.service';
import { UserSummaryController } from './userSummary.controller';
import { UserModule } from '../user/user.module';
import { SorenessModule } from 'src/resources/businessLogic/soreness/soreness.module';
import { ProficiencyModule } from 'src/resources/businessLogic/proficiency/proficiency.module';

@Module({
  controllers: [UserSummaryController],
  providers: [UserSummaryService],
  imports: [UserModule, ProficiencyModule, SorenessModule],
})
export class UserSummaryModule {}
