import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity, OrderItemEntity } from '@entity';
import {  OrderRepository, ProductRepository, StoreRepository, UserRepository } from '@repository';
import { StoreService } from '@service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '@setup';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity,OrderItemEntity ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
    })
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, ProductRepository, StoreRepository,StoreService,UserRepository],
})
export class OrderModule { }
