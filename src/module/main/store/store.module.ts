import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreEntity, UserEntity } from '@entity';
import { StoreRepository, UserRepository } from '@repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoreEntity, UserEntity])
  ],
  controllers: [StoreController],
  providers: [StoreService, StoreRepository,UserRepository],
  exports : [StoreService]
})
export class StoreModule {

}
