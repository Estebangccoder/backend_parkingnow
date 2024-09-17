import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotsModule } from 'src/slots/slots.module'; 
import {  Create,
          FindById,
          Update ,
          Delete,
          TransformStringToDate,
          CalculateAmount,
          FindAll,
          CalculateRentedHours} from './services';


@Module({
  imports: [TypeOrmModule.forFeature([Booking]), SlotsModule],
  controllers: [BookingsController],
  providers: [  BookingsService,
                Create, 
                Update, 
                FindById,
                Delete, 
                TransformStringToDate,
                CalculateAmount, 
                FindAll,
                CalculateRentedHours],
  exports: [BookingsService]
})
export class BookingsModule {}
