import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "@entity";
import { AuthController, UserController } from "@controller";
import { UserService, } from "@service";
import { UserRepository } from "@repository";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserService,
    UserRepository,
    JwtService
  ],
  exports: []
})

export class UserModule { }