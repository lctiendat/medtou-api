import { BaseRepository } from "@repository";
import { CategoryEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class CategoryRepository extends BaseRepository<CategoryEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(CategoryEntity, dataSource.createEntityManager());
    }
}