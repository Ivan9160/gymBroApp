import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { PrismaService } from './prisma.service';
import { WorkoutModule } from './resources/workout/workout.module';
import { SetModule } from './resources/set/set.module';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './resources/exercise/exercise.module';
import { ExerciseGroupModule } from './resources/exercise-group/exerciseGroup.module';

@Module({
  imports: [UserModule, WorkoutModule, SetModule, AuthModule, ExerciseModule, ExerciseGroupModule],
  controllers: [AppController],
  providers: [PrismaService, AppService, {provide: 'APP_GUARD', useClass: AuthModule}],
})
export class AppModule {}
