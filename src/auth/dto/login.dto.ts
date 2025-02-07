import { IsNotEmpty, IsString } from "class-validator";


export class LoginDTO {

    @IsNotEmpty()
    @IsString()
    readonly emailId: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;

}