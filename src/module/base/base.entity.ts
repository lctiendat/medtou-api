import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsUUID } from "class-validator";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { faker } from '@faker-js/faker';

@Entity()
export class BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    @ApiProperty({
        example: faker.string.uuid()
    })
    id?: string

    @Column({
        default: false
    })
    @IsBoolean()
    @ApiProperty({
        example: false
    })
    isDeleted: boolean


    @Column({
        default: true
    })
    @IsBoolean()
    @ApiProperty({
        example: true
    })
    isActived: boolean

    @CreateDateColumn()
    @IsDateString()
    @ApiProperty({
        example: faker.date.past().toISOString()
    })
    createdAt: Date

    @UpdateDateColumn()
    @IsDateString()
    @ApiProperty({
        example: faker.date.past().toISOString()
    })
    updatedAt: Date
}