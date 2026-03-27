import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  (app.getHttpAdapter() as any).getInstance().set('trust proxy', true);
  app.enableCors({
    origin: process.env.VITE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,

  });

  const port = process.env.PORT ?? 3000;
  app.use((req, res, next) => {
  logger.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});
  await app.listen(port);

  logger.log(`🚀 Server running on http://100.93.105.118:${port}/api`);
}
bootstrap();
