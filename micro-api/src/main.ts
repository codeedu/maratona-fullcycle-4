import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MEDIA_URL } from './file';
import { RedisIoAdapter } from './adapters/redis-io.adapter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setViewEngine('hbs');
  app.useGlobalPipes(
    new ValidationPipe({ errorHttpStatusCode: 422, whitelist: true }),
  );
  app.useStaticAssets(join(__dirname, '..', 'media'), { prefix: MEDIA_URL });
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  const options = new DocumentBuilder()
    .setTitle('CodeSlack')
    .setVersion('1.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
