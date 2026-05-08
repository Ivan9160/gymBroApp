import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/API/user/user.module';
import { PrismaService } from './prisma.service';
import { WorkoutModule } from './resources/API/workout/workout.module';
import { SetModule } from './resources/API/set/set.module';
import { AuthModule } from './auth/auth.module';
import { ExerciseModule } from './resources/API/exercise/exercise.module';
import { ExerciseGroupModule } from './resources/API/exercise-group/exerciseGroup.module';
import { SorenessModule } from './resources/businessLogic/soreness/soreness.module';

@Module({
  imports: [UserModule, WorkoutModule, SetModule, AuthModule, ExerciseModule, ExerciseGroupModule, SorenessModule],
  controllers: [AppController],
  providers: [PrismaService, AppService, {provide: 'APP_GUARD', useClass: AuthModule}],
})
export class AppModule {}
