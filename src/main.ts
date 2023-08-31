import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('Book Store Api')
    .setDescription('This api is providing functionalities that powers online book store')
    .setVersion('1.0')
    .addTag('Book Store Api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.setGlobalPrefix('/api/v1');
  await app.listen(3000);
}
bootstrap();
