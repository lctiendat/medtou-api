import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { UserService } from '@service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Route } from 'src/shared/decorate/route.decorate';

@Route('user')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async getProfile(@Request() req) {           
      return await this.userService.findByUsername(req.user.username)
  }
}
