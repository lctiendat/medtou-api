import { BaseRepository } from "@repository";
import { CategoryEntity, CategoryLogEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CategoryLogRepository extends BaseRepository<CategoryLogEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(CategoryLogEntity, dataSource.createEntityManager());
    }
}