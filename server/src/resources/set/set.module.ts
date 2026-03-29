import { Module } from '@nestjs/common';
import { SetController } from './set.controller';
import { SetService } from './set.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SetController],
  providers: [PrismaService,SetService]
})
export class SetModule {}
