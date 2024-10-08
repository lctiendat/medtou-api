import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookingEntity, OrderEntity, UserEntity } from "@entity";
import { AuthController, UserController } from "@controller";
import { AuthService, UserService, } from "@service";
import { DriverRepository, StoreRepository, UserRepository } from "@repository";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { envConfig } from "@setup";
import { JwtStrategy } from "./guard/jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,OrderEntity,BookingEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
    })
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    UserRepository,
    JwtService,
    AuthService,
    JwtStrategy,
    StoreRepository,
    DriverRepository
  ],
  exports: []
})

export class UserModule { }