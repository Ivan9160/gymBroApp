import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { NextFunction } from 'express';
import { join } from 'path';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  console.log('REDIS_HOST:', process.env.REDIS_HOST, 'REDIS_PORT:', process.env.REDIS_PORT);


  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  (app.getHttpAdapter() as any).getInstance().set('trust proxy', true);
  app.enableCors({
    origin: [process.env.VITE_URL, 'https://gymbro-tracker.pp.ua'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,

  });

  const port = process.env.PORT ?? 3000;
  app.use((req: Request, res: Response, next: NextFunction) => {
  logger.log(`Incoming request: ${req.method} ${req.url}`);
  console.log(
    'GIF ROOT:',
    join(__dirname, '..', '..', 'static', 'exercise-gifs'),
  );

  next();
});
  await app.listen(port);
  logger.log(`Server is running on port ${port}`);
}
bootstrap();
