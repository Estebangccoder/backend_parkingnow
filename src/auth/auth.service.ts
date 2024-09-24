import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { QueryFailedError } from 'typeorm';
import { UserPaginationDto } from 'src/users/dto/users-pagination.dto';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private jwtService:JwtService 
    ){}

    async login({email, password}: LoginDto){

        try {
            const user:User = await this.userService.findOneByEmail(email)

            if (!user) {
                throw new UnauthorizedException('Invalid credentials')
            }
            const isPasswordValid = await bcryptjs.compare(password, user.password)
    
            if (!isPasswordValid) {
                throw new UnauthorizedException('Invalid credentials')
            }
    
            const payload = {email: user.email, role_id: user.role_id, user_id: user.id}
           
            const token = await this.jwtService.signAsync(payload)

            const userId = user.id
    
            return {
                token,
                email,
                userId
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
        try{
        
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
        
        }catch(error){
            if (error instanceof QueryFailedError) {
                throw new QueryFailedError("Bad request", undefined, error);
              }
              throw new InternalServerErrorException(error.message || "Internal server error");
        }
        
    }
    async profile({email,role_id}: {email: string, role_id: number}){
        return await this.userService.findOneByEmail(email)
    }
    async findAll(userPaginationDto: UserPaginationDto){
        return await this.userService.findAll(userPaginationDto)
    }   
}
