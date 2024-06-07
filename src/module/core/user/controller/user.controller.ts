import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { UserService } from '@service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

}
