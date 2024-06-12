import { ConflictException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { BaseService } from '@service';
import { StoreRepository, UserRepository } from '@repository';
import { StoreEntity, UserEntity } from '@entity';
import { ROLE } from 'src/setup/enum';
import { DataSource } from 'typeorm';

@Injectable()
export class StoreService extends BaseService<StoreEntity> {
  constructor(public readonly repo: StoreRepository,
    public readonly userRepo: UserRepository,
    private dataSource: DataSource,

  ) {
    super(repo);
  }
  async create(body: CreateStoreDto) {
    const { email, phoneNumber } = body

    const checkEmail = await this.userRepo.findOne({ email, role: ROLE.STORE });

    if (!!checkEmail) {
      throw new ConflictException(`Email ${email} already registed`)
    }
    const checkPhone = await this.userRepo.findOne({ email, role: ROLE.STORE });
    if (!!checkPhone) {
      throw new ConflictException(`Phone ${phoneNumber} already registed`)
    }

    return await this.dataSource.transaction(async entityManager => {

      const newUser = await entityManager.save(
        entityManager.create(UserEntity, {
          email,
          phoneNumber,
          role: ROLE.STORE
        })
      )
      const newStore = await entityManager.save(entityManager.create(StoreEntity, {
        userId: newUser.id
      }))
      return newStore;
    })
  }

  findAll() {
    return this.repo.find({}, ['user'])
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
