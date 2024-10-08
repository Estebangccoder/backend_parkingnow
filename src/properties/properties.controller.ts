import { Controller,  Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query, UseGuards, Req } from '@nestjs/common';
import { PropertiesService } from './properties.service'
import { CreatePropertyDto } from './dto/create-properties.dto';	
import { UpdatePropertyDto } from './dto/update-properties.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';


@ApiTags('Porperties')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.USER)
@Controller('properties')
export class PropertiesController {

    constructor(private readonly propertiesService: PropertiesService){}

    @Post()
    @ApiOperation({ summary: 'Create a new property' })
    create(@Body() createPropertyDto: CreatePropertyDto, @Req() req:RequestWithUser){
        return this.propertiesService.create(createPropertyDto, req.user.email);
    }
    
    @Get()
    @ApiOperation({ summary: 'Get all properties' })
    findAll(@Req() req:RequestWithUser) {
        return this.propertiesService.findAll(req.user.user_id);
    }

    @Get('searchById')
    @ApiOperation({ summary: 'Get a property by ID' })
    @ApiQuery({ name: 'ID', description: 'ID of the property to search for' })
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

   
    @Get('searchByName') // Usa una ruta fija para la búsqueda, y usa @Query para obtener el nombre.
    @ApiOperation({ summary: 'Get a property by name' })
    @ApiQuery({ name: 'name', description: 'Name of the property to search for' })
    async findByName(@Req() req:RequestWithUser, @Query('name') name: string) {
   
      if (!name) {
        throw new HttpException('Name query parameter is required', HttpStatus.BAD_REQUEST);
      }
  
      try {
        return await this.propertiesService.findByName(name, req.user.user_id);
      } catch (error) {
        throw new HttpException(
          `Error finding properties: ${error.message}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a property by ID' })
    @ApiQuery({ name: 'ID', description: 'ID of the property to search for' })
    update(@Req() req:RequestWithUser, @Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
        return this.propertiesService.update(id, updatePropertyDto, req.user.user_id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a property by ID' })
    @ApiQuery({ name: 'ID', description: 'ID of the property to search for' })
    remove(@Req() req:RequestWithUser,@Param('id') id: string) {
        return this.propertiesService.remove(id, req.user.user_id);
    }
}
