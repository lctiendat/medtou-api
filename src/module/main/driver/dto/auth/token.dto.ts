import { PickType } from "@nestjs/swagger";
import { DriverEntity } from '@entity';

export class TokenDto extends PickType(DriverEntity, ['refreshToken']) { }