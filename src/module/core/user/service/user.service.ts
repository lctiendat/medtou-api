import { ConflictException, Injectable } from '@nestjs/common';
import { UserEntity } from '@entity';
import * as bcrypt from 'bcrypt';
import { BaseService } from '@service';
import { UserRepository } from '@repository';
import { PickType } from '@nestjs/swagger';
import { ROLE } from 'src/setup/enum';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    public readonly repo: UserRepository
  ) {
    super(repo)
  }

  async create(data: any): Promise<UserEntity | any> {

    let user: UserEntity = await this.findByUsername(data.email)

    if (!!user && !!user.email) {
      throw new ConflictException(`Email ${data.email} already exists`)
    }
    const newUser = this.repo.create(data);
    return await this.repo.save(newUser)
  }

  async findByUsername(email: string): Promise<UserEntity> {
    return this.repo.findOne({ email, role: ROLE.USER });
  }

  async updateRefreshToken(userId: any, refreshToken: string): Promise<void> {
    await this.repo.update(userId, { refreshToken });
  }
}
 