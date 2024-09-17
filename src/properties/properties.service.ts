import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
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

 async create(createPropertyDto: CreatePropertyDto) {
      const newProperty = this.propertyRepository.create(createPropertyDto);
      return await this.propertyRepository.save(newProperty);
  }

  async findAll() {

      return await this.propertyRepository.find();
  }

  async findByName(name: string): Promise<Property[]> {
      const propertiesNames = await this.propertyRepository.find({
        where: { name: name }
      });
    
      return propertiesNames;
  }

  async findOne(id: string) {
      const property = await this.propertyRepository.findOneBy({ id });
        if(!property) throw new NotFoundException('Property not found')
      return property;

  }

  async update(id: string, updatePropertyDto: UpdatePropertyDto) {
   
      const result = await this.propertyRepository.update(id, updatePropertyDto);

      if (result.affected === 0) {
        throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
      }

      return updatePropertyDto;
  
  }

  async remove(id: string) {

      const result = await this.propertyRepository.softDelete(id);

      if (result.affected === 0) {
        throw new HttpException('Property not found', HttpStatus.NOT_FOUND);
      }

  }
}
