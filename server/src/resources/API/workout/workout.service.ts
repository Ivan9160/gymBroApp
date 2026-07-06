import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { WorkoutStatus } from './dto/workoutStatus.enum';
import { IWorkoutFilterOptions } from 'src/common/interfaces';
import { Prisma } from '../../../../generated/prisma';

@Injectable()
export class WorkoutService {
    constructor(private readonly prisma: PrismaService) { }
    create(dto: CreateWorkoutDto, userId: number) {
        return this.prisma.workout.create({
            data:{
                user_id: userId,
                status: dto.status,
                finishedAt: dto.finishedAt
            }
        })
    }
    finishWorkout(id: number, userId: number, body: UpdateWorkoutDto) {
        return this.prisma.workout.update({
            where: { 
                id,
                user_id: userId
             },
            data: {
                status: body.status,
                finishedAt: body.finishedAt
            }
        })
    }
    findAllByUserId(id: number, 
        options?: IWorkoutFilterOptions
    ) {
        const whereClause: Prisma.WorkoutWhereInput = {
            user_id: id,
            status: WorkoutStatus.COMPLETED,
        };
        if (options?.since) {
            whereClause.finishedAt = { 
                gte: options.since 
            };
        }

        return this.prisma.workout.findMany({
            where: whereClause,
            include: {
                sets: {
                    include: {
                        exercise: {
                            include: {
                                exerciseGroup: true
                            }
                        }
                    }
                }
            }
        })
    }

}
