import { BadRequestException, Body, NotFoundException, Post, Query, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as bcrypt from 'bcrypt';
import { AuthService, UserService } from "@service";
import { JwtService } from "@nestjs/jwt";
import { Route } from "src/shared/decorate/route.decorate";
import { UserEntity } from "@entity";
import { SigninDto, SignupDto, TokenDto } from "@dto";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { envConfig } from "@setup";


@Route('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtService: JwtService,
        private userService: UserService
    ) { }

    @Post('signup')
    async register(@Body() body: SignupDto): Promise<UserEntity | any> {
        const data = await this.authService.signup(body);
        return {
            message: 'Register successful',
            data
        };
    }

    @Post('signin')
    async login(@Body() body: SigninDto, @Query('role') role: number): Promise<UserEntity | any> {
        const data = await this.authService.signin(body, role)

        return {
            message: 'Login successful',
            data
        };
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('access-token')
    @Post('refresh')
    async refresh(@Request() req: any, @Body() body: TokenDto): Promise<any> {
        console.log(req.user);

        const data = await this.authService.getAccessToken(req, body)
        return {
            message: 'Get access token successful',
            data
        };
    }
};
