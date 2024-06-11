import { Injectable } from "@nestjs/common";
import { FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from "typeorm";

@Injectable()
export class BaseRepository<T extends ObjectLiteral> extends Repository<T> {
    find(options: any = {}): Promise<T[]> {
        const { skip, take, ...otherOptions } = options;
        const mergedOptions: FindManyOptions<T> = {
            ...options,
            where: {
                ...(options || {}),
                isDeleted: false
            },
            order: {
                createdAt: 'DESC',
            },
            skip,
            take
        };

        return super.find(mergedOptions);
    }

    findOne(id: string | number | Date | ObjectLiteral, options?: any): Promise<T> {
        // Merge the provided options with the default options
        const mergedOptions: FindOneOptions<T> = {
            ...options,
            where: {
                ...(options?.where || {}),
                isDeleted: false,
                id
            }
        };

        return super.findOne(mergedOptions);
    }
}

