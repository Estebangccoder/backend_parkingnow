import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
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
}
