import { Body, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import * as bcrypt from 'bcrypt';
import { UserService } from "@service";
import { JwtService } from "@nestjs/jwt";
import { Route } from "src/shared/decorate/route.decorate";
import { User } from "@entity";


@Route('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    @Post('register')
    async register(@Body() body: { username: string, password: string }) : Promise<User> {
        const user = await this.userService.create(body.username, body.password);
        return user;
    }

    @Post('login')
    async login(@Body() body: { username: string, password: string }) {
        const user = await this.userService.findByUsername(body.username);
        if (user) {
            const payload = { username: user.username, sub: user.id };
            const accessToken = this.jwtService.sign(payload, { secret: 'access_secret', expiresIn: '15m' });
            const refreshToken = this.jwtService.sign(payload, { secret: 'refresh_secret', expiresIn: '7d' });

            await this.userService.updateRefreshToken(user?.id, refreshToken);

            return { accessToken, refreshToken };
        }
        return 'Invalid credentials';
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('refresh')
    async refresh(@Request() req) {
        const user = await this.userService.findByUsername(req.user.username);
        if (user && user.refreshToken === req.body.refreshToken) {
            const payload = { username: user.username, sub: user.id };
            const accessToken = this.jwtService.sign(payload, { secret: 'access_secret', expiresIn: '15m' });

            return { accessToken };
        }
        return 'Invalid refresh token';
    }
};
