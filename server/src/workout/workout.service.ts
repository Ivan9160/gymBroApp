import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkoutDto } from './workout.dto';

@Injectable()
export class WorkoutService {
    constructor(private readonly prisma: PrismaService) { }
    create(dto: CreateWorkoutDto) {
        return this.prisma.workout.create({
            data:{
                date: dto.date,
                userId: dto.userId,
            }
        })
    }
}
