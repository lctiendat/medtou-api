import { BaseEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { Column } from "typeorm";

export class CategoryEntity extends BaseEntity {
    @Column()
    @IsString()
    @ApiProperty({
        example: faker.person.fullName()
    })
    name: string;

    @Column()
    @IsString()
    @ApiProperty({
        example: faker.lorem.paragraph()
    })
    description: string;

    @Column({
        default: null
    })
    @IsString()
    @ApiProperty({ example: faker.image.avatar() })
    image: string

    @Column()
    @IsUUID()
    @ApiProperty({ example: faker.string.uuid() })
    userId: string;

    @Column({
        default: null
    })
    @IsUUID()
    @ApiProperty({ example: faker.string.uuid() })
    parentId: string

}
