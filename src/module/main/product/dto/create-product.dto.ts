import { PickType } from "@nestjs/swagger";
import { ProductEntity } from "@entity";

export class CreateProductDto extends PickType(ProductEntity,['name','description','price','quantity','images','categoryId']) {}
