import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { WorkoutStatus } from './dto/workoutStatus.enum';
import { IWorkoutFilterOptions } from 'src/common/interfaces';
import { Prisma } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class WorkoutService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly eventEmitter: EventEmitter2
    ) { }
    create(dto: CreateWorkoutDto, userId: number) {
        return this.prisma.workout.create({
            data:{
                user_id: userId,
                status: dto.status,
                finishedAt: dto.finishedAt
            }
        })
    }

    async finishWorkout(
        id: number,
        userId: number,
        body: UpdateWorkoutDto
    ) {
        const workout =
            await this.prisma.workout.findFirst({
                where: {
                    id,
                    user_id: userId,
                },
                include: {
                    sets: true,
                },
            });

        if (!workout) {
            throw new NotFoundException(
                `Workout with id "${id}" not found`
            );
        }

        if (workout.sets.length === 0) {
            await this.prisma.workout.delete({
                where: {
                    id: workout.id,
                },
            });

            return {
                deleted: true,
                workout: null,
            };
        }

        const updatedWorkout =
            await this.prisma.workout.update({
                where: {
                    id: workout.id,
                },
                data: {
                    status: body.status,
                    finishedAt: body.finishedAt,
                },
            });

        if (
            updatedWorkout.status ===
            WorkoutStatus.COMPLETED
        ) {
            this.eventEmitter.emit(
                "workout.completed",
                {
                    userId,
                }
            );
        }

        return updatedWorkout;
    }

    findAll() {
        return this.prisma.workout.findMany();
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
                                exerciseGroup: true,
                                muscleFactors: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

}
