import { ApiProperty, PickType } from "@nestjs/swagger";
import { BookingEntity } from "@entity";
import { Column } from "typeorm";
import { IsArray, IsOptional } from "class-validator";
import { faker } from "@faker-js/faker";

interface IProductDTO {
    name: string
    quantity: number,
    image : string
}

export class CreateBookingDto extends PickType(BookingEntity, [
    'fromAddress', 'toAddress', 'fromLat', 'fromLng', 'toLat', 'toLng', 'cost', 'distance','type'
]) { 
    @Column()
    @IsOptional()
    @IsArray()
    @ApiProperty({
        example: [{
            name: faker.string.uuid(),
            quantity: faker.number.int({ max: 2 }),
            image : faker.image.avatar()
        }]
    })
    products: Array<IProductDTO>
}
