import { OrderEntity, OrderProductEntity, ProductEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { Column } from "typeorm";
import { IsArray, IsNotEmpty } from 'class-validator';


interface IProductDTO {
    productId: string
    quantity: number
}

export class CreateOrderDto extends PickType(OrderEntity, ['note', 'storeId']) {
    @Column()
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        example: [{
            productId: faker.string.uuid(),
            quantity: faker.number.int({ max: 2 }),
        }]
    })
    products: Array<IProductDTO>
}
