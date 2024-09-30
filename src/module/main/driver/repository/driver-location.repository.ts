import { BaseRepository } from "@repository";
import { DriverEntity, DriverLocationEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class DriverLocationRepository extends BaseRepository<DriverLocationEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(DriverLocationEntity, dataSource.createEntityManager());
    }
}