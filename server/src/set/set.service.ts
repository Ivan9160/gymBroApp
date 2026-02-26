import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSetDto } from './set.dto';

@Injectable()
export class SetService {
    constructor(private readonly prisma: PrismaService) { }
    
    create(dto: CreateSetDto) {
        return this.prisma.set.create({
            data: {
                exerciseId: dto.exerciseId,
                workoutId: dto.workoutId,
                weight: dto.weight,
                reps: dto.reps,
                notes: dto.notes
                
            }
        })
    }
}