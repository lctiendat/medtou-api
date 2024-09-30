import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity, DriverEntity, DriverLocationEntity } from "@entity";
import { AuthController, DriverController } from "@controller";
import { AuthService, DriverService, UserService} from "@service";
import { DriverLocationRepository, DriverRepository,UserRepository,StoreRepository } from "@repository";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { envConfig } from "@setup";
import { JwtStrategy } from "./guard/jwt.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([DriverEntity,DriverLocationEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: envConfig.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: envConfig.JWT_ACCESS_TIME },
    })
  ],
  controllers: [DriverController, AuthController],
  providers: [
    DriverService,
    DriverRepository,
    DriverLocationRepository,
    JwtService,
    AuthService,
    JwtStrategy,
    UserRepository,
    UserService,
    StoreRepository
  ],
  exports: []
})

export class DriverModule { }