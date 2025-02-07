import { IsNotEmpty, IsString } from "class-validator";


export class LoginDTO {

    @IsNotEmpty()
    @IsString()
    readonly mobileNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

}