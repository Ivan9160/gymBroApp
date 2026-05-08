import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { PrismaService } from 'src/prisma.service';
import { ExerciseService } from '../exercise/exercise.service';
import { ExerciseGroupService } from '../exercise-group/exerciseGroup.service';

@Module({
  providers: [WorkoutService,PrismaService],
  controllers: [WorkoutController],
  exports: [WorkoutService],
})
export class WorkoutModule {}
