import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService:JwtService 
    ){}

    async login({email, password}: LoginDto){

        try {
            const user = await this.userService.findOneByEmail(email)

            if (!user) {
                throw new UnauthorizedException('Invalid credentials')
            }
            const isPasswordValid = await bcryptjs.compare(password, user.password)
    
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials')
            }
    
            const payload = {email: user.email, role_id: user.role_id}
            console.log(payload);
            
    
            const token = await this.jwtService.signAsync(payload)

            console.log(token);
            
            return {
                token,
                email
            }
        } catch (error) {
            throw new HttpException(error, 500)
        }
      
    }

    async register({
        fullname, 
        email, 
        password, 
        phone_number, 
        address,
        document_type_id,
        doc_number
    }: RegisterDto){
     
        const user = await this.userService.findOneByEmail(email)

        if (user) {
            throw new BadRequestException('User already exists')
        }
        
         await this.userService.create({
            fullname,
            email,
            password: await bcryptjs.hash(password,8),
            phone_number,
            address,
            doc_number,
            document_type_id
        })
        return {fullname, email}
    }
    async profile({email,role_id}: {email: string, role_id: number}){
        return await this.userService.findOneByEmail(email)
    }
    async findAll(){
        return await this.userService.findAll()
    }   
}
