import { BaseEntity } from "@entity";
import { BeforeInsert, Column, Entity } from "typeorm";


@Entity()
export class User extends BaseEntity {

    @Column({
        default: 'username'
    })
    username: string;


    @Column({
        default: 'username'
    })
    password: string;

    @Column({
        default: 'username'
    })
    refreshToken: string;
}
