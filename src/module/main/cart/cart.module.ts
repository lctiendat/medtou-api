import { Module } from '@nestjs/common';
import { CartService } from '@service';
import { CartController } from '@controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from '@entity';
import { CartRepository, ProductRepository } from '@repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { envConfig } from '@setup';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
    })
  ],
  controllers: [CartController],
  providers: [CartService,CartRepository,ProductRepository],
})
export class CartModule { }
