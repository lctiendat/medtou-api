import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from '@setup';
import setupSwagger from './setup/swagger';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filter/all-exceptions.filter';
import { ResponseInterceptor } from './shared/filter/response.interceptor';

async function bootstrap(): Promise<void> {
  const app: INestApplication<any> = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  });



  if (envConfig.NODE_ENV !== 'prod') {
    setupSwagger(app)
  }

  await app.listen(envConfig.SV_PORT, '0.0.0.0', () => {
    const logger = new Logger('___DevLog___')
    logger.log(`Application is running on: http://localhost:${envConfig.SV_PORT}`)
  });
}
bootstrap();
