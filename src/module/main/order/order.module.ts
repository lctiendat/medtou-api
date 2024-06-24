import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity, OrderProductEntity } from '@entity';
import { OrderProductRepository, OrderRepository, ProductRepository, StoreRepository, UserRepository } from '@repository';
import { StoreService } from '@service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '@setup';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderProductEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
    })
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository, OrderProductRepository, ProductRepository, StoreRepository,StoreService,UserRepository],
})
export class OrderModule { }
