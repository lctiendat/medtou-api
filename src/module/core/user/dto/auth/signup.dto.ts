import { ApiProperty, PickType } from "@nestjs/swagger";
import { UserEntity, examplePassword } from "@entity";
import { IsNotEmpty, IsString, Matches } from "class-validator";

export class SignupDto extends PickType(UserEntity, ['name', 'email', 'phoneNumber', 'password'] as const) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: examplePassword,
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: examplePassword,
    })
    rePassword: string;
}