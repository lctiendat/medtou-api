import { Injectable } from '@nestjs/common';
import { User } from '@entity';
import * as bcrypt from 'bcrypt';
import { BaseService } from '@service';
import { UserRepository } from '@repository';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    public readonly repo: UserRepository
  ) {
    super(repo)
  }

  async create(username: string, password: string): Promise<User> {
    const user = this.repo.create({ username});
    return this.repo.save(user);
  }

  async findByUsername(username: string): Promise<User> {
    return this.repo.findOne({ where: { username } });
  }

  async updateRefreshToken(userId: any, refreshToken: string): Promise<void> {
    await this.repo.update(userId, { refreshToken });
  }
}
