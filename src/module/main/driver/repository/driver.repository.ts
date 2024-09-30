import { BaseRepository } from "@repository";
import { DriverEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class DriverRepository extends BaseRepository<DriverEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(DriverEntity, dataSource.createEntityManager());
    }
}