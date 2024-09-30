import { Controller, Post, Body, UseGuards, Request, Get, Query } from '@nestjs/common';
import { DriverService } from '@service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Route } from 'src/shared/decorate/route.decorate';
import { SigninDto } from '@dto';
import { DriverEntity } from '@entity';

@Route('driver')
export class DriverController {
  constructor(
    private driverService: DriverService,
  ) { }

  @Post('signin')
  async login(@Body() body: SigninDto): Promise<DriverEntity | any> {
      const data = await this.driverService.signin(body)
      return {
          message: 'Login successful',
          data
      };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('profile')
  async getProfile(@Request() req) {           
      return await this.driverService.findByDrivername(req.driver.username)
  }

}
