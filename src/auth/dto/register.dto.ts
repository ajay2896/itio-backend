import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class RegistrationDTO {

    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    readonly mobileNumber: string;


    @IsNotEmpty()
    @IsBoolean()
    readonly isAdmin: boolean;

}
