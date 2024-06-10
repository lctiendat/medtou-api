import { BaseEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";

@Entity('categories')
export class CategoryEntity extends BaseEntity {
    @Column()
    @IsString()
    @ApiProperty({
        example: faker.lorem.text()
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


    @Column({
        default: null
    })
    @IsOptional()
    @IsUUID()
    @ApiProperty({ example: faker.string.uuid() })
    parentId: string

    @OneToMany(() => CategoryEntity, category => category.parentId)
    parent: CategoryEntity[]

}
