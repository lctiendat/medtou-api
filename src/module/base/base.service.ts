import { ObjectLiteral } from "typeorm";
import { BaseRepository } from "@repository";
import { Injectable, NotFoundException } from "@nestjs/common";
@Injectable()
export class BaseService<T extends ObjectLiteral> {
    constructor(public readonly repo: BaseRepository<T>,
        public listJoin: string[] = []
    ) {
        this.listJoin = listJoin
    }

    findAll(options: any = {}): Promise<T[]> {
        return this.repo.find(options, this.listJoin)
    }

    async findOne(id: string, options: any = {}): Promise<T> {
        const data: T = await this.repo.findById(id)
        if (!!!data) {
            throw new NotFoundException('Data not found')
        }
        return this.repo.findById(id, options, this.listJoin)
    }


    async delete(id: string, options: any = {}) {
        const data: T = await this.repo.findById(id)
        if (!!!data) {
            throw new NotFoundException('Data not found')
        }
        return await this.repo.delete(id, options)
    }

    async deleteHard(id: string) {
        const data: T = await this.repo.findById(id)
        if (!!!data) {
            throw new NotFoundException('Data not found')
        }
        await this.repo.deleteHard(id)
        return null
    }
}

