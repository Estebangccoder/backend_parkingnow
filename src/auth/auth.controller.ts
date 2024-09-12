import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorators';
import { AuthGuard } from './guard/auth.guard';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';

interface RequestWithUser extends Request{
    user: {
        email:string
        role_id:number
    }
}

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
    @Get('profile')
    @Roles(Role.USER)
    @UseGuards(AuthGuard, RolesGuard)
    profile(
        @Req()
    req: RequestWithUser,
    ){
        return this.authService.profile({
            email: req.user.email,
            role_id: req.user.role_id 
        })
    }
}
