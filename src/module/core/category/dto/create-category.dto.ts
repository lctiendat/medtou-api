import { PickType } from "@nestjs/swagger";
import { CategoryEntity } from "@entity";

export class CreateCategoryDto extends PickType(CategoryEntity, ['name', 'description', 'image', 'parentId']) {

}
