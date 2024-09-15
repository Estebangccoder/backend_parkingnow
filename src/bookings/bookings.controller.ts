import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { UpdateBookingDto, ReceiveBookingDataDto } from './dto';


@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post() 
  create(@Body() bookingData: ReceiveBookingDataDto) {
    //ReceivedBookingData: DTO para definir la estructura que llegara por el cuerpo de la solicitud.
    return this.bookingsService.create(bookingData);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
