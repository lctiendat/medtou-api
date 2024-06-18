import { Logger, Module } from '@nestjs/common';
import { envConfig } from './setup/env';
import { CartModule, CategoryModule, UserModule } from '@module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { StoreModule } from './module/main/store/store.module';
import { ProductModule } from './module/main/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      'type': 'mysql',
      'host': envConfig.DB_HOST,
      'port': envConfig.DB_PORT,
      'username': envConfig.DB_USERNAME,
      'password': envConfig.DB_PASSWORD,
      'database': envConfig.DB_NAME,
      'autoLoadEntities': true,
      'synchronize': true,
    }),
    PassportModule,
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET || 'secret',
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME || '15m' },
    }),
    CategoryModule,
    UserModule,
    StoreModule,
    ProductModule,
    CartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { } 
