import { PickType } from "@nestjs/swagger";
import { DriverEntity } from "@entity";

export class SigninDto extends PickType(DriverEntity, ['email', 'password'] as const) {}