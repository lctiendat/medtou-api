import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from '@controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@entity';
import { ProductRepository } from '@repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductEntity])
  ],
  controllers: [ProductController],
  providers: [ProductService,ProductRepository],
})
export class ProductModule {}
