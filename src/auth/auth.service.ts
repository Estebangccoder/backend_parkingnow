import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService:JwtService 
    ){}

    async login({email, password}: LoginDto){
        const user = await this.userService.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = {email: user.email, }

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            email
        }
    }
    async register({
        fullName, 
        email, 
        password, 
        phone, 
        address,
        id_typedoc,
        num_doc}: RegisterDto){
        
        
        const user = await this.userService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('User already exists')
        }
        
        return await this.userService.create({
            fullName,
            email,
            password: await bcryptjs.hash(password,8),
            phone,
            address,
            num_doc,
            id_typedoc
        })
    }
    
}
