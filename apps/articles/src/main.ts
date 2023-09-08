import { NestFactory } from '@nestjs/core';
import { ArticlesModule } from './articles.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ArticlesModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
