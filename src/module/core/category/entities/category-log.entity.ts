import { BaseEntity } from "@entity";
import { faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsUUID } from "class-validator";
import { CRUD } from "src/setup/enum";
import { Column, Entity } from "typeorm";


@Entity('category_log')

export class CategoryLogEntity extends BaseEntity {
    @Column()
    @IsUUID()
    categoryId: string;

    @Column()
    @IsUUID()
    userId: string;

    @Column()
    @IsNumber()
    type: number;


}