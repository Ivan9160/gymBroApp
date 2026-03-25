import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  const keyPath = process.env.SSL_KEY_PATH || '../../localhost-key.pem';
  const certPath = process.env.SSL_CERT_PATH || '../../localhost.pem';

  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, keyPath)),
    cert: fs.readFileSync(path.resolve(__dirname, certPath)),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.ALLOWED_ORIGIN || "https://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  
  logger.log(`🚀 Server running on https://100.93.105.118:${port}/api`);
}
bootstrap();