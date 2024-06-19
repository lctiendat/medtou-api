import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from '@controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderProductEntity, ProductEntity } from '@entity';
import { CategoryRepository, ProductRepository } from '@repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '@setup';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity,OrderProductEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
    })
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository,CategoryRepository],
})
export class ProductModule { }
