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
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CacheModule } from '@nestjs/cache-manager';
import { ProficiencyService } from './resources/businessLogic/proficiency/proficiency.service';
import { ProficiencyListener } from './resources/API/user-summary/proficiency.listener';
import { UserSummaryModule } from './resources/API/user-summary/userSummary.module';
import { Keyv } from 'keyv';
import KeyvRedis from '@keyv/redis';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

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
  ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'static', 'exercise-gifs'),
      serveRoot: '/exercise-gifs',
      useGlobalPrefix: true,
      serveStaticOptions: {
        maxAge: '30d', 
        immutable: true,
      },
    }),
    UserModule, 
    WorkoutModule, 
    SetModule, 
    AuthModule, 
    ExerciseModule, 
    ExerciseGroupModule, 
    UserSummaryModule
  ],
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
