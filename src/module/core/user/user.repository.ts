import { BaseRepository } from "@repository";
import { User } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(User, dataSource.createEntityManager());
    }
}