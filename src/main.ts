import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('TEST API')
    .setDescription('DESC')
    .setVersion('1.0.0')
    .setContact(
      'Teacoder Team',
      'https://www.youtube.com/playlist?list=PLCAZyR6zw2px5C7L2cCG4aywx6g58MIoP',
      'atlets-sport@yandex.ru',
    )
    .build();

  const doc = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/docs', app, doc);

  await app.listen(3000);
}
bootstrap();
