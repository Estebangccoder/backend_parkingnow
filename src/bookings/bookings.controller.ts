import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseBoolPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { EndDateDataDto, ReceiveBookingDataDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags, ApiQuery } from "@nestjs/swagger";
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

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get('get-one/:id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Get('by-driver')
  @ApiOperation({ summary: "Get the user's booking who is in progress" })
  findInProgressByDriver(@Req() req: RequestWithUser) { 
    return this.bookingsService.findBookingInProgressByDriver(req.user.email);  
  }

  @Get('in-progress-by-owner')
  @ApiOperation({ summary: "Get the bookings in progress of my slots "})
  findInProgressByOwner(@Req() req: RequestWithUser) {
      return this.bookingsService.findBookingInProgressByOwner(req.user.email);
  }


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
  returnAmount(@Body() data: EndDateDataDto, @Req() req: RequestWithUser){
      return this.bookingsService.returnAmountAndHours(data, req.user.email);
  }

  @Patch('end-booking/terminate')
  @ApiOperation({ summary: 'Terminate a booking' })
  terminate(@Req() req: RequestWithUser) {
      return this.bookingsService.terminate(req.user.email);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by ID' })
  softDelete(@Param('id') id: string) {
    return this.bookingsService.delete(id);
  }
}
