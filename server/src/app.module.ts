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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule } from '@nestjs/cache-manager';
import { ProficiencyService } from './resources/businessLogic/proficiency/proficiency.service';
import { ProficiencyListener } from './resources/API/user-summary/proficiency.listener';
import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CacheModule.registerAsync({
    isGlobal: true,
    useFactory: async () => {
      return {
        stores: [
          new Keyv({
            store: new KeyvRedis(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`),
          }),
        ]
      }
    },
  }),
    UserModule, WorkoutModule, SetModule, AuthModule, ExerciseModule, ExerciseGroupModule, SorenessModule],
  controllers: [AppController],
  providers: [
    ProficiencyService,
    ProficiencyListener,
    PrismaService, 
    AppService, 
    {provide: 'APP_GUARD', useClass: AuthModule}



  ],
})
export class AppModule {}
