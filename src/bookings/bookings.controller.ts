import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { EndDateDataDto, ReceiveBookingDataDto } from './dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags} from "@nestjs/swagger";
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all bookings' })
  async findAll() {
    return await this.bookingsService.findAll();
  }

  @Get('get-one/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get a booking by ID' })
  async findOne(@Param('id') id: string) {
    return await this.bookingsService.findOne(id);
  }

  @Get('in-progress-by-driver')
  @ApiOperation({ summary: "Get the user's booking who is in progress" })
  async findInProgressByDriver(@Req() req: RequestWithUser) { 
    return await this.bookingsService.findBookingInProgressByDriver(req.user.user_id); 
  }

  @Get('in-progress-by-owner')
  @ApiOperation({ summary: "Get the bookings in progress of my slots "})
  async findInProgressByOwner(@Req() req: RequestWithUser) {
     return await this.bookingsService.findBookingInProgressByOwner(req.user.user_id);
  }


  @Post() 
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({ type: ReceiveBookingDataDto })
  async create(@Body() bookingData: ReceiveBookingDataDto, @Req() req: RequestWithUser) {
    
    //ReceivedBookingData: DTO para definir la estructura que llegara por el cuerpo de la solicitud.
    return await this.bookingsService.create(bookingData, req.user.email)
  }

  @Post('end-booking')
  @ApiOperation({ summary: 'Request amount and total hours' })
  @ApiBody({ type: EndDateDataDto })
  async returnAmount(@Body() data: EndDateDataDto, @Req() req: RequestWithUser){
      return await this.bookingsService.returnAmountAndHours(data, req.user.email);
  }

  @Patch('end-booking/terminate')
  @ApiOperation({ summary: 'Terminate a booking' })
  async terminate(@Req() req: RequestWithUser) {
      return await this.bookingsService.terminate(req.user.email);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete a booking by ID' })
  async softDelete(@Param('id') id: string) {
    return await this.bookingsService.delete(id);
  }
}
