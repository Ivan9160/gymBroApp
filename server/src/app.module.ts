import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { WorkoutModule } from './workout/workout.module';
import { SetModule } from './set/set.module';
import { SetService } from './set/set.service';

@Module({
  imports: [UserModule, WorkoutModule, SetModule],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
