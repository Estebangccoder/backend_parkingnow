import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { CreatePropertyDto } from './dto/create-properties.dto';
import { UpdatePropertyDto } from './dto/update-properties.dto';



@Injectable()
export class PropertiesService {
    constructor(
        @InjectRepository(Property)
        private readonly propertyRepository: Repository<Property>,
    ) {}

    async create(createPropertyDto: CreatePropertyDto){
        try{
            const newProperty = this.propertyRepository.create(createPropertyDto)
            return await this.propertyRepository.save(newProperty);
   
        }
        catch(error){
            throw new HttpException(`Error creating property: ${error.message}`, 500);
        }
    }

    async findAll(){
        try{
            return await this.propertyRepository.find();
        }
        catch(error){
            throw new HttpException(`Error finding all properties: ${error.message}`, 500);
        }
    }

    async findByName(name:string): Promise<Property[]>{
        try{
            const propertiesNames = await this.propertyRepository.find({where: { name: Like(`%${name.trim()}%`) }}); //Ene l front debe de haber un devounce PILAS!!!!!!!!!!!!!!!!!!!!

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
       
        let property: Property = await this.propertyRepository.findOneBy({id});
        
        if (!property){
            throw new HttpException('Property not found', 404);
        }
        
        return property

        }
        catch(error){
            throw new HttpException(`Error finding property by id: ${error.message}`, 500);
        }
    }

    async update(id: string, updatePropertyDto: UpdatePropertyDto){
        try{
            const result = await this.propertyRepository.update(id, updatePropertyDto);
            
            if (result.affected === 0){
                throw new HttpException('Property not found', 404);
            }
            return updatePropertyDto
        }
        catch(error){
            throw new HttpException(`Error updating property by id: ${error.message}`, 500);
        }
    }

    async remove(id: string){
        try{
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
