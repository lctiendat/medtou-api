import { CartEntity } from "@entity";
import { PickType } from "@nestjs/swagger";

export class CreateCartDto extends PickType(CartEntity, ['productId', 'quantity']) {}
