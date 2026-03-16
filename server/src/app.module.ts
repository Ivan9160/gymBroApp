import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { WorkoutModule } from './workout/dto/workout.module';
import { SetModule } from './set/set.module';
import { SetService } from './set/set.service';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseGroupModule } from './exercise-group/exerciseGroup.module';

@Module({
  imports: [UserModule, WorkoutModule, SetModule, AuthModule, ExerciseModule, ExerciseGroupModule],
  controllers: [AppController],
  providers: [PrismaService, AppService, {provide: 'APP_GUARD', useClass: AuthModule}],
})
export class AppModule {}
