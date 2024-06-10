import { BaseEntity } from "@entity";
import { da, faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsString } from "class-validator";
import { BeforeInsert, Column, Entity } from "typeorm";
import * as bcrypt from 'bcrypt';

export const examplePassword  = faker.internet.password()

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.person.fullName()
    })
    name: string

    @Column({ nullable: true })
    @IsString()
    @ApiProperty({
        example: faker.image.avatar()
    })
    avatar: string

    @Column()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: faker.internet.email()
    })
    email: string

    @Column({ nullable: true })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.phone.number()
    })
    phoneNumber: string

    @Column()
    @IsNotEmpty()
    @IsString()
    // @Exclude()
    @Expose()
    @ApiProperty({
        example: examplePassword
    })
    password: string

    @Column({ nullable: true })
    @IsDateString()
    @ApiProperty({
        example: faker.date.past().toISOString()
    })
    birthday: Date

    @Column({ nullable: true })
    @ApiProperty({
        example: faker.lorem.paragraph()
    })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
