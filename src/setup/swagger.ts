import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { envConfig } from '@setup';

export default function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('API')
    .setDescription(
      'The Medifast API description',
    ).setVersion('1.0')
    .addBearerAuth();

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('documentation', app, document);
  const logger = new Logger('___DevLog___');
  logger.log(`Documentation Server: http://localhost:${envConfig.SV_PORT}${envConfig.SWAGGER_URI}`);
}