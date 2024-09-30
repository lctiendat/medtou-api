import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DriverEntity } from '@entity';
import * as bcrypt from 'bcrypt';
import { BaseService } from '@service';
import { DriverRepository } from '@repository';
import { PickType } from '@nestjs/swagger';
import { ROLE } from 'src/setup/enum';
import { SigninDto } from '@dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DriverService extends BaseService<DriverEntity> {
  constructor(
    public readonly repo: DriverRepository,
    public jwtService: JwtService

  ) {
    super(repo)
  }

  async create(data: any): Promise<DriverEntity | any> {

    let driver: DriverEntity = await this.findByDrivername(data.email)

    if (!!driver && !!driver.email) {
      throw new ConflictException(`Email ${data.email} already exists`)
    }
    const newDriver = this.repo.create(data);
    return await this.repo.save(newDriver)
  }

  async findByDrivername(email: string): Promise<DriverEntity> {
    return this.repo.findOne({ email, role: ROLE.DRIVER });
  }

  async updateRefreshToken(userId: any, refreshToken: string): Promise<void> {
    await this.repo.update(userId, { refreshToken });
  }

  async signin(data: SigninDto): Promise<any> {

    console.log(123);
    
    const user: DriverEntity = await this.repo.findOne({
      email: data.email,
    })

    if (!!!user) {
      throw new NotFoundException(`Email ${data.email} not found`)
    }
    const isMatch: boolean = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new BadRequestException('Password is incorrect')
    }    

    const payload = { username: user.email, id: user.id, role: user.role };
    const accessToken: string = this.jwtService.sign(payload, { secret: 'access_secret', expiresIn: '1d' });
    const refreshToken: string = this.jwtService.sign(payload, { secret: 'refresh_secret', expiresIn: '7d' });

    this.updateRefreshToken(user?.id, refreshToken);

    return {
      ...user,
      accessToken,
      refreshToken
    }
  }
}
