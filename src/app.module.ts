import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { envConfig } from './setup/env';
import { CategoryModule } from './module/core/category/category.module';
import { UserModule } from './user/user.module';

@Module({ 
  imports: [
    MongooseModule.forRoot(envConfig.MONGO_URL, {
      connectionFactory: (connection) => {
        const logger = new Logger('__Database__')
        connection.on('connected', () => { 
          logger.log('Connected to MongoDB successfully');
        });
        connection.on('error', (err) => {
          logger.error(`MongoDB connection error: ${err}`);
        })
        connection._events.connected();
        return connection;
      },
    },
    ),
    CategoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
