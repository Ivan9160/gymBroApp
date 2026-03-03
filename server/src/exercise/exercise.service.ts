import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateExerciseDto,UpdateExerciseDto } from './exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateExerciseDto) {
    return this.prisma.exercise.create({
        data: {
            name: dto.name,
            video: dto.video || "",
            exerciseGroup: {
                connect: { name: dto.group },
            },
        },
  })
  }

  findAll() {
    return `This action returns all exercise`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exercise`;
  }

  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return `This action updates a #${id} exercise`;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
