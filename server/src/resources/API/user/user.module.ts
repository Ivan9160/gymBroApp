import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { ProficiencyModule } from 'src/resources/businessLogic/proficiency/proficiency.module';
import { SorenessModule } from 'src/resources/businessLogic/soreness/soreness.module';

@Module({
    controllers: [UserController],
    imports: [ProficiencyModule, SorenessModule],
    providers: [UserService, PrismaService],
    exports: [UserService],
})
export class UserModule {}
