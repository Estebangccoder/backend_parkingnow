import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterDto } from "../auth/dto/register.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { RequestResetPasswordDto } from "./dto/request-reset-password.dto";
import { v4 } from 'uuid';
import { ResetPasswordDto } from "./dto/reset-password.dto";
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  async create(createUserDto: RegisterDto) {
    return  await this.userRepository.save(createUserDto);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException("User not found");
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
   try{
    const userFound = await this.userRepository.update(id, updateUserDto);

    if(!userFound){
      throw new HttpException('User not found',404)
    }

    if(userFound.affected===0){
      throw new HttpException('No changes were made',400)
    }
    return userFound;
  } 
    catch(error){
      throw new HttpException(`Error ${error.message}`,500)
      }
    
  }

  async remove(id: string) {
    const userFound = await this.findOne(id);
    await this.userRepository.softRemove(userFound);
    return "User deleted successfully";
  }

  async requestResetPassword(
    requestResetPasswordDto: RequestResetPasswordDto,
  ){
    const { email } = requestResetPasswordDto;
    const user: User = await this.userRepository.findOneBy({ email });
    user.resetPasswordToken = v4();
    this.userRepository.save(user);
    // Send email (e.g. Dispatch an event so MailerModule can send the email)
  }

  async findOneByResetPasswordToken(resetPasswordToken: string): Promise<User>{
    const user: User = await this.userRepository.findOne({where:{resetPasswordToken} });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { resetPasswordToken, password } = resetPasswordDto;
    const user: User = await this.findOneByResetPasswordToken(
    resetPasswordToken,
    );

    user.password = await bcryptjs.hash(password,8)
    user.resetPasswordToken = null;
    this.userRepository.save(user);
  }
  
}
