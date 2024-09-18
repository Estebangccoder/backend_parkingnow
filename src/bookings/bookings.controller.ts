import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { EndDateDataDto, ReceiveBookingDataDto, UpdateBookingDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";


@ApiTags('Bookings')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.USER)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}


  @Post() 
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: ReceiveBookingDataDto })
  create(@Body() bookingData: ReceiveBookingDataDto, @Req() req: RequestWithUser) {
    //ReceivedBookingData: DTO para definir la estructura que llegara por el cuerpo de la solicitud.
    return this.bookingsService.create(bookingData, req.user.email)
  }

  @Post('end-booking')
  @ApiOperation({ summary: 'Request amount and total hours' })
  @ApiBody({ type: EndDateDataDto })
  returnAmount(@Body() data: EndDateDataDto){
   return this.bookingsService.returnAmountAndHours(data);

  }

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a booking by ID' })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by ID' })
  softDelete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
