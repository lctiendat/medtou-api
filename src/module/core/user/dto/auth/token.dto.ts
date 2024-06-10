import { PickType } from "@nestjs/swagger";
import { UserEntity } from '@entity';

export class TokenDto extends PickType(UserEntity, ['refreshToken']) { }