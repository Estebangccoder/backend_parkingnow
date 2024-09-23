import { Injectable, HttpException, HttpStatus, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
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
            throw new HttpException(`Error creating property: ${error.message}`, 500);
        }
    }

    async findAll(ownerId:string){
        try{


            return await this.propertyRepository.find({where: {owner_id: ownerId}, relations:["slots"]});
        }
        catch(error){
            throw new HttpException(`Error finding all properties: ${error.message}`, 500);
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
            throw new HttpException(`Error finding all properties: ${error.message}`, 500);
        }
    }

    async findOne(id: string){
       try{

        let property: Property[] = await this.propertyRepository.find({where: {id}, relations: ["slots"] });

        return property

        }
        catch(error){
            throw new HttpException(`Error finding property by id: ${error.message}`, 500);
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
            throw new HttpException(`Error updating property by id: ${error.message}`, 500);
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
            
        const result = await this.propertyRepository.delete(id);
        if (result.affected===0){
            throw new HttpException('Property not found', 404);
        }
    }
    catch(error){
        throw new HttpException(`Error removing property by id: ${error.message}`, 500);
    }

    }
}