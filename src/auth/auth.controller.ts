import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    registration( @Body() body:RegistrationDTO) {

        return this.authService.registrationService(body);

    }

    @Post('login')
    login( @Body() body:LoginDTO) {

        return this.authService.loginService(body);

    }


}
