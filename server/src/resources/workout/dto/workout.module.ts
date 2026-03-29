import { Module } from '@nestjs/common';
import { WorkoutService } from '../workout.service';
import { WorkoutController } from '../workout.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [WorkoutService,PrismaService],
  controllers: [WorkoutController]
})
export class WorkoutModule {}
