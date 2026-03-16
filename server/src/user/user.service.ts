import { Injectable, UsePipes } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';


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
            auth0Id:dto.auth0Id,
            

            userProfile: {
            create: {
                age: dto.age,
                gender: dto.gender,
                height: dto.height,
                weight: dto.weight,
                goal: dto.goal,

                
            },
            },
        },

        });

        
    }
    update(id: number, dto: UpdateUserDto) {
        return this.prisma.user.update({
            where : { id },
            data: {
                name: dto.name,
                role:dto.role,
                
                userProfile: {
                    update: {
                    data: {
                        age: dto.age,
                        gender: dto.gender,
                        height: dto.height,
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
                userProfile: {
                    
                }
            }
            
        });
        console.log('Found user:', user);
        return user;
        
    }
}