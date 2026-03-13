import { Module } from '@nestjs/common';
import {  ExerciseGroupService } from './exerciseGroup.service';
import { ExerciseGroupController } from './exerciseGroup.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ExerciseGroupController],
  providers: [ExerciseGroupService, PrismaService],
})
export class ExerciseGroupModule {}
