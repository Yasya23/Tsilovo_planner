import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { Handler } from 'express';

const server = express();
const adapter = new ExpressAdapter(server);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, adapter);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  app.enableCors({
    origin: configService.get('FRONTEND_URL') || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  await app.init();

  if (process.env.NODE_ENV === 'development') {
    const port = configService.get('PORT') || 4200;
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}`);
  }
}
bootstrap();

export const handler: Handler = server;
