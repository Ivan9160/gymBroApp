import { Module } from '@nestjs/common';
import { SorenessService } from './soreness.service';


@Module({
  providers: [SorenessService],
  exports: [SorenessService],
})
export class SorenessModule {}
