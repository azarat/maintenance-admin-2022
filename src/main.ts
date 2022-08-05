import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Admin')
    .setDescription('Admin API')
    .setVersion('1.0')
    .addServer(process.env.API_HOST)
    .build();

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
    { swaggerOptions: { operationsSorter: 'method' } },
  );
  await app.listen(process.env.PORT);
}
bootstrap();
