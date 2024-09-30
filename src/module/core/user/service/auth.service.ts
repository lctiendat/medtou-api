

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '@entity';
import * as bcrypt from 'bcrypt';
import { BaseService, UserService } from '@service';
import { StoreRepository, UserRepository } from '@repository';
import { SignupDto, SigninDto, TokenDto } from '@dto';
import { JwtService } from '@nestjs/jwt';
import { envConfig } from '@setup';
import { ROLE } from 'src/setup/enum';

@Injectable()
export class AuthService extends BaseService<UserEntity> {
  constructor(
    public readonly repo: UserRepository,
    public userService: UserService,
    public readonly storeRepo: StoreRepository,
    public jwtService: JwtService
  ) {
    super(repo)
  }

  async signup(data: SignupDto): Promise<UserEntity | any> {

    let user: UserEntity = await this.userService.findByUsername(data.email)


    const { password, rePassword } = data

    if (password && rePassword && password !== rePassword) {
      throw new BadRequestException('Password is not match')
    }

    if (!!user && !!user.email) {
      throw new ConflictException(`Email ${data.email} already exists`)
    }
    const newUser = this.repo.create(data);
    return await this.repo.save(newUser)
  }

  async signin(data: SigninDto): Promise<any> {

    const user: UserEntity = await this.repo.findOne({
      email: data.email,
    })

    if (!!!user) {
      throw new NotFoundException(`Email ${data.email} not found`)
    }
    const isMatch: boolean = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new BadRequestException('Password is incorrect')
    }
    const payload = { username: user.email, id: user.id };
    const accessToken: string = this.jwtService.sign(payload, { secret: 'access_secret', expiresIn: '1d' });
    const refreshToken: string = this.jwtService.sign(payload, { secret: 'refresh_secret', expiresIn: '7d' });

    this.updateRefreshToken(user?.id, refreshToken);

    return {
      ...user,
      accessToken,
      refreshToken
    }

  }

  async getAccessToken(req: any, body: TokenDto) {
    const user = await this.userService.findByUsername(req.user.username);

    if (user && user.refreshToken === body.refreshToken) {
      const payload = { username: user.email, id: user.id };
      const accessToken = this.jwtService.sign(payload, { secret: envConfig.JWT_ACCESS_SECRET, expiresIn: envConfig.JWT_ACCESS_TIME });
      return accessToken;
    }
  }


  async updateRefreshToken(userId: any, refreshToken: string): Promise<void> {
    await this.repo.update(userId, { refreshToken });
  }
}
