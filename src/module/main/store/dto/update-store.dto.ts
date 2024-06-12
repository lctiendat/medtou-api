import { PartialType } from '@nestjs/swagger';
import { CreateStoreDto } from './create-store.dto';


import { IntersectionType, PickType } from "@nestjs/swagger";
import { StoreEntity, UserEntity } from "@entity";

export class UserDto extends PickType(UserEntity, ['name', 'phoneNumber'] as const) {}
export class StoreDto extends PickType(StoreEntity, ['description', 'addressId'] as const) {}

export class UpdateStoreDto extends IntersectionType(UserDto, StoreDto) {}
