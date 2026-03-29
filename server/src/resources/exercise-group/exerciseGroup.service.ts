import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateExerciseGroupDto, UpdateExerciseGroupDto } from './exerciseGroup.dto';

@Injectable()
export class ExerciseGroupService {
  constructor(private readonly prisma: PrismaService) {}
  create(dto: CreateExerciseGroupDto) {
    return this.prisma.exerciseGroup.create({
        data: {
            name: dto.name,
        },
  })
  }

  findAll() {
    return this.prisma.exerciseGroup.findMany();
  }

  findOne(id: number) {
    return this.prisma.exerciseGroup.findUnique({
      where: { id }
    });
  }

  update(id: number, updateExerciseGroupDto: UpdateExerciseGroupDto) {
    return this.prisma.exerciseGroup.update({
      where: { id },
      data: updateExerciseGroupDto
    });
  }

  remove(id: number) {
    return `This action removes a #${id} exercise group`;
  }
}
