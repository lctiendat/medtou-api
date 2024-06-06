import { Controller, applyDecorators } from "@nestjs/common";
import { ApiHeader, ApiTags } from "@nestjs/swagger";

export function Route(path: string) {
    return applyDecorators(
        Controller(path),
        ApiTags(capitalizeFirstLetter(path)),
        ApiHeader({
            name: 'Accept-Language',
            description: 'The language code used for content negotiation', // Mô tả của header
            required: false,
        })
    );
}

const capitalizeFirstLetter = (string: string): string =>
    string
        .split('/')
        .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
        .join(' ');
