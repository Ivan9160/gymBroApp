import { Module } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';

@Module({
  providers: [ProficiencyService],
  exports: [ProficiencyService],
})
export class ProficiencyModule {}
