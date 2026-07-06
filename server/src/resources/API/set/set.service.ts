import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSetDto } from './dto/set.dto';

@Injectable()
export class SetService {
    constructor(private readonly prisma: PrismaService) { }
    
    async create(dto: CreateSetDto, userId: number) {
        const workout = await this.prisma.workout.findFirst({
            where: {
                id: dto.workoutId,
                user_id: userId
            }
        });
        if (!workout) {
            throw new ForbiddenException("Workout not found or does not belong to the user");
        }
        return this.prisma.set.create({
            data: dto
        })
    }
    async delete(id: number, userId: number) {
        console.log("Deleting set with id:", id);
        return this.prisma.set.deleteMany({
            where: {
                id: id,
                workout: {
                    user_id: userId
                }
            }
        })
    }
}