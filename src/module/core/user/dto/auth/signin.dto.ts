import { PickType } from "@nestjs/swagger";
import { UserEntity } from "@entity";

export class SigninDto extends PickType(UserEntity, ['email', 'password'] as const) {}