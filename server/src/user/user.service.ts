import { Injectable, UsePipes } from '@nestjs/common';
import { User } from 'generated/prisma';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, TUpdateUserDto } from './user.dto';


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
                goal: dto.goal,

                
            },
            },
        },

        });
    }
    update(id: number, dto: TUpdateUserDto) {
        return this.prisma.user.update({
            where : { id },
        data: {
            name: dto.name,
            email:dto.email,
            age: dto.age,
            gender: dto.gender,
            height: dto.height,

            stats: {
        update: {
          data: {
            weight: dto.weight,
            goal: dto.goal,
          },
        },
      },
        },

        });
    }

    async findByAuth0Id(auth0Id: string) { 
        console.log('Finding user with auth0Id:', auth0Id);
        const user = await this.prisma.user.findUnique({
            where: { auth0Id },
            include: {
                stats: {
                    
                }
            }
            
        });
        console.log('Found user:', user);
        return user;
        
    }
}