import { BaseRepository } from "@repository";
import { CategoryEntity, ProductEntity } from "@entity";
import { DataSource } from "typeorm";
import { Injectable } from "@nestjs/common";


@Injectable()
export class ProductRepository extends BaseRepository<ProductEntity> {
    constructor(
        private readonly dataSource: DataSource
    ) {
        super(ProductEntity, dataSource.createEntityManager());
    }
}