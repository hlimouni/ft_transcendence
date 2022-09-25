import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const FrontHost = configService.get<string>('FRONT_HOST');
  const ServerPort = configService.get<string>('SERVER_PORT');

  app.enableCors({
    origin: `${FrontHost}`,
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableShutdownHooks();

  //Swagger API
  const config = new DocumentBuilder()
    .setTitle('ft_transcendence Api')
    .setDescription('there is no description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(ServerPort);
}
bootstrap();
