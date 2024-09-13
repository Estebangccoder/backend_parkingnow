import { Controller,  Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service'
import { CreatePropertyDto } from './dto/create-properties.dto';	
import { UpdatePropertyDto } from './dto/update-properties.dto';
import { query } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Porperties')
@Controller('properties')
export class PropertiesController {

    constructor(private readonly propertiesService: PropertiesService){}

    @Post()
    create(@Body() createPropertyDto: CreatePropertyDto) {
        return this.propertiesService.create(createPropertyDto);
    }
    
    @Get()
    findAll() {
        return this.propertiesService.findAll();
    }

    @Get('search')
    async findOne(@Query('id') id: string) {
        if (!id) {
            throw new HttpException('ID query parameter is required', HttpStatus.BAD_REQUEST);
        }
        try {
            return await this.propertiesService.findOne(id);
        } catch (error){
            throw new HttpException(
              `Error finding property: ${error.message}`,
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get('search') // Usa una ruta fija para la búsqueda, y usa @Query para obtener el nombre.
    async findByName(@Query('name') name: string) {
      if (!name) {
        throw new HttpException('Name query parameter is required', HttpStatus.BAD_REQUEST);
      }
  
      try {
        return await this.propertiesService.findByName(name);
      } catch (error) {
        throw new HttpException(
          `Error finding properties: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
        return this.propertiesService.update(id, updatePropertyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.propertiesService.remove(id);
    }
}
