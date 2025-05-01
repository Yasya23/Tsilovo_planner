import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.init();

  return server;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((server) => {
    server.listen(4200, () => {
      console.log('🚀 Server running on http://localhost:4200');
    });
  });
}

// For Vercel serverless
export default bootstrap();
