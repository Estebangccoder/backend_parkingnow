import { Injectable, HttpException, HttpStatus, NotFoundException, UnauthorizedException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Repository, Like, QueryFailedError } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-properties.dto';
import { UpdatePropertyDto } from './dto/update-properties.dto';
import { UsersService } from '../users/users.service';


@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
    private readonly userService: UsersService
  ) {}


 async create(createPropertyDto: CreatePropertyDto,email:string){
        try{


            const user= await this.userService.findOneByEmail(email);
            if(!user) throw new UnauthorizedException()

            createPropertyDto.owner_id=user.id;
            return await this.propertyRepository.save(createPropertyDto);

        }
        catch(error){
            if (error instanceof QueryFailedError) {
                throw new BadRequestException()
              }
              throw new InternalServerErrorException(error.message || "Internal server error");
        }
    }

    async findAll(ownerId:string){
        try{


            return await this.propertyRepository.find({where: {owner_id: ownerId}, relations:["slots"]});
        }
        catch(error){
            if (error instanceof QueryFailedError) {
                throw new BadRequestException()
              }
              throw new InternalServerErrorException(error.message || "Internal server error");
        
        }
    }

    async findByName(name:string, ownerId:string): Promise<Property[]>{
        try{
            const user= await this.userService.findOne(ownerId);
            if(user.id!==ownerId){
                throw new UnauthorizedException()
            }
            const propertiesNames = await this.propertyRepository.find({where: {name: Like(`%${name.trim()}%`), owner_id: ownerId},  relations:["slots"]  }); //Ene l front debe de haber un devounce PILAS!!!!!!!!!!!!!!!!!!!!

            if(propertiesNames.length===0){
                throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
            }

            return propertiesNames;
        }
        catch(error){
            if (error instanceof QueryFailedError) {
                throw new BadRequestException()
              }
              throw new InternalServerErrorException(error.message || "Internal server error");
        }
    }

    async findOne(id: string){
       try{

        let property: Property[] = await this.propertyRepository.find({where: {id}, relations: ["slots"] });

        return property

        }
        catch(error){
            if (error instanceof QueryFailedError) {
                throw new BadRequestException()
              }
              throw new InternalServerErrorException(error.message || "Internal server error");
        }
    }

    async update(id: string, updatePropertyDto: UpdatePropertyDto, owner_id: string){
        try{
            const propertyfound = await this.propertyRepository.findOneBy({id})
            if (!propertyfound){
                throw new NotFoundException('Property not found');
            }
            const response = await this.userService.ownerIdValidation(propertyfound.owner_id, owner_id)
            if (!response) throw new UnauthorizedException("You are not allowed to update this property")

            const result = await this.propertyRepository.update(id, updatePropertyDto);
        
        }
        catch(error){
            if (error instanceof QueryFailedError) {
                throw new BadRequestException()
              }
              throw new InternalServerErrorException(error.message || "Internal server error");
        }
    }

    async remove(id: string, owner_id:string){
        try{ 

            const propertyfound = await this.propertyRepository.findOneBy({id})
            if (!propertyfound){
                throw new NotFoundException('Property not found');
            }
            const response = await this.userService.ownerIdValidation(propertyfound.owner_id, owner_id)
            if (!response) throw new UnauthorizedException("You are not allowed to update this property")
            
        const result = await this.propertyRepository.softRemove(propertyfound);
        
    }
    catch(error){
        if (error instanceof QueryFailedError) {
            throw new BadRequestException()
          }
          throw new InternalServerErrorException(error.message || "Internal server error");
    }

    }
}