import { BaseRepository } from "@repository";
import { UserEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(UserEntity, dataSource.createEntityManager());
    }
}