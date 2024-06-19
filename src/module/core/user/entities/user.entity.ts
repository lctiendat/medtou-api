import { BaseEntity, CartEntity, OrderEntity, StoreEntity } from "@entity";
import { da, faker } from "@faker-js/faker";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { IsDateString, IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ROLE } from "src/setup/enum";

export const exampleUsername = 'admin@admin.com'
export const examplePassword = 'admin@123'

@Entity('users')
export class UserEntity extends BaseEntity {

    @Column({ nullable: true })
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
        example: exampleUsername
    })
    email: string

    @Column({ nullable: true })
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: faker.phone.number()
    })
    phoneNumber: string

    @Column({
        default: examplePassword
    })
    @IsNotEmpty()
    @IsString()
    @IsOptional()
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

    @Column({ default: ROLE.USER })
    role: number

    @Column({ nullable: true })
    @ApiProperty({
        example: faker.lorem.paragraph()
    })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;

    @JoinColumn()
    @OneToOne(() => StoreEntity, store => store.user)
    store: StoreEntity

    @JoinColumn()
    @OneToOne(() => CartEntity, cart => cart.user)
    cart: CartEntity

    @JoinColumn()
    @OneToOne(() => OrderEntity, order => order.user)
    order: OrderEntity

    @BeforeInsert()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password || examplePassword, 10);
    }
}
