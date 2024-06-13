import { BaseEntity, ProductEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";

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


    @ManyToOne(() => CategoryEntity, category => category.children)
    parent: CategoryEntity;

    @OneToMany(() => CategoryEntity, category => category.parent)
    children: CategoryEntity[];

    @OneToOne(() => ProductEntity, product => product.category)
    product: ProductEntity[];

} 
