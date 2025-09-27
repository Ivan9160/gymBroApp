import { Injectable, UsePipes } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './user.dto';


@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService){}
    findAll() {
        return this.prisma.user.findMany();
    }

    
    create(dto: CreateUserDto) {
        return this.prisma.user.create({
        data: {
            name: dto.name,
            email:dto.email,
            auth0Id:dto.auth0Id,
            age: dto.age,
            gender: dto.gender,
            height: dto.height,

            stats: {
            create: {
                weight: dto.weight,
                fatPercentage: dto.fatPercentage,
                goal: dto.goal,

                workoutList: {
                create: {
                    
                },
                },
            },
            },
        },
        include: {
            stats: {
            include: {
                workoutList: true,
            },
            },
        },
        });
    }

    async findByAuth0Id(auth0Id: string) { 
        return await this.prisma.user.findUnique({
            where: { auth0Id },
            include: {
                stats: {
                    include:{workoutList: true}
                }
            }
            
        });
        
    }
}