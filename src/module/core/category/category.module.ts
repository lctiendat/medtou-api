import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoryLogEntity } from './entities/category-log.entity';
import { CategoryRepository, CategoryLogRepository } from '@repository';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '@setup';
import { PassportModule } from '@nestjs/passport';
import { ProductEntity } from '@entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity, CategoryLogEntity, ProductEntity]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: envConfig.JWT_ACCESS_SECRET,
    signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
  })],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryLogRepository],
})
export class CategoryModule { }
