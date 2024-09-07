import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}
    @Post('login')
    login(
        @Body()
        loginDto: LoginDto
    ){
       return this.authService.login(loginDto)
    }
    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
       return this.authService.register(registerDto)
    }
}
