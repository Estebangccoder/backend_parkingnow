import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import {  Create,
          FindById,
          Update ,
          Delete,
          TransformStringToDate,
          CalculateAmount,
          FindAll} from './services';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotsModule } from 'src/slots/slots.module'; 



@Module({
  imports: [TypeOrmModule.forFeature([Booking]), SlotsModule],
  controllers: [BookingsController],
  providers: [  BookingsService,
                Create, Update, FindById,
                Delete, TransformStringToDate,
                CalculateAmount, FindAll],
  exports: [BookingsService]
})
export class BookingsModule {}
