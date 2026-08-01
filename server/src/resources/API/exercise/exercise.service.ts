import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateExerciseDto,UpdateExerciseDto } from './dto/exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateExerciseDto) {
    return this.prisma.exercise.create({
        data: {
            name: dto.name,
            video: dto.video || "",
            isBodyweight: dto.isBodyweight || false,
            exerciseGroup: {
                connect: { id: dto.groupId},
            },
        },
  })
  }

  findAll() {
    return this.prisma.exercise.findMany({
      include: { exerciseGroup: true }
    });
  }

  findOne(id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
      include: { exerciseGroup: true }
    });
  }

  
  update(id: number, updateExerciseDto: UpdateExerciseDto) {
    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  remove(id: number) {
    return this.prisma.exercise.delete({
      where: { id }
    });
  }
}
