import { Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {

    find(options: any = {}, relations: Array<string> = []): Promise<T[]> {
        const { skip, take, ...otherOptions } = options;
        const mergedOptions: FindManyOptions<T> = {
            ...options,
            where: {
                ...(options || {}),
                isDeleted: false
            },
            relations,
            order: {
                createdAt: 'DESC',
            },
            skip,
            take
        };
        return super.find(mergedOptions);
    }

    findById(id: string | number | Date | ObjectLiteral, options?: any, relations: Array<string> = []): Promise<T> {
        const mergedOptions: FindOneOptions<T> = {
            ...options,
            where: {
                ...(options || {}),
                isDeleted: false,
                id
            },
            relations
        };
        return super.findOne(mergedOptions);
    }

    findOne(options?: any): Promise<T> {
        const mergedOptions: FindOneOptions<T> = {
            ...options,
            where: {
                ...(options || {}),
                isDeleted: false,
            }
        };
        return super.findOne(mergedOptions);
    }

    delete(id: string, options?: any) {
        const mergedOptions: any = {
            ...(options || {}),
            isDeleted: true
        };
        return super.update(id, mergedOptions);
    }

    deleteHard(id: string) {
        return super.delete(id)
    }
}

