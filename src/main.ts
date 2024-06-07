import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from '@setup';
import setupSwagger from './setup/swagger';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter)

  if (envConfig.NODE_ENV !== 'prod') {
    setupSwagger(app)
  }

  await app.listen(envConfig.SV_PORT, '0.0.0.0', () => {
    const logger = new Logger('___DevLog___')
    logger.log(`Application is running on: http://localhost:${envConfig.SV_PORT}`)
  });
}
bootstrap();
