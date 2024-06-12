import { BaseRepository } from "@repository";
import { StoreEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class StoreRepository extends BaseRepository<StoreEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(StoreEntity, dataSource.createEntityManager());
    }
}