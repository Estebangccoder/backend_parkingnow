import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';
import { HttpErrorFilter } from './common/filters/http-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ResponseFormatInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true
  }));
  app.useGlobalFilters(new HttpErrorFilter());
  const config = new DocumentBuilder()
    .setTitle('Parking now API')
    .setDescription('This is the documentation for our API, here you will find all our endpoints, how to access them and what responses they will give. ')
    .setVersion('1.0')
    .addBearerAuth()

    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });
  await app.listen(3000);
}
bootstrap();
