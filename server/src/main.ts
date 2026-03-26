import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const envPath = path.resolve(process.cwd(), '.env');
  const envConfig = dotenv.parse(fs.readFileSync(envPath));
  const keyPath = envConfig.SSL_KEY_PATH;
  const certPath = envConfig.SSL_CERT_PATH;
  const httpsOptions = {
    key: fs.readFileSync(path.resolve('', keyPath)),
    cert: fs.readFileSync(path.resolve('', certPath)),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.setGlobalPrefix('api');

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

  logger.log(`🚀 Server running on https://100.93.105.118:${port}/api`);
}
bootstrap();
