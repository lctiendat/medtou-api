import { PickType } from "@nestjs/swagger";
import { StoreEntity, UserEntity } from "@entity";

export class CreateStoreDto extends PickType(UserEntity, ['email', 'phoneNumber']){}
