import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.resolve(__dirname, '../../localhost-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, '../../localhost.pem')),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: "https://localhost:5173",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  });
  await app.listen(process.env.PORT ?? 3000);
  

  
}
bootstrap();
