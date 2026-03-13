import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './workout.dto';

@Injectable()
export class WorkoutService {
    constructor(private readonly prisma: PrismaService) { }
    create(dto: CreateWorkoutDto) {
        return this.prisma.workout.create({
            data:{
                user_id: dto.userId,
                status: dto.status,
                finishedAt: dto.finishedAt
            }
        })
    }
    finishWorkout(id: number, body: UpdateWorkoutDto) {
        return this.prisma.workout.update({
            where: { id },
            data: {
                status: body.status,
                finishedAt: body.finishedAt
            }
        })
    }
}
