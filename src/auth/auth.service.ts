import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UsersService){}

    async login({email, password}: LoginDto){
        const user = await this.userService.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const isPasswordValid = password === user.password 
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }
        return user
    }
    async register(registerDto: RegisterDto){
        const user = await this.userService.findOneByEmail(registerDto.email)

        if (user) {
            throw new BadRequestException('User already exists')
        }
        
        return await this.userService.create(registerDto)
    }
    
}
