import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();

async function createApp() {
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

if (process.env.NODE_ENV === 'development') {
  createApp().then((app) => {
    const port = process.env.PORT || 4200;
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  });
}

export default createApp();
