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
          CalculateRentedHours,
          GetUserIdByEmail,
          GetOwnerId,
          FindBookingInProgress,
          VerifyPlateWithoutBooking} from './services';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([Booking]), SlotsModule, UsersModule],
  controllers: [BookingsController],
  providers: [  BookingsService,
                Create, 
                Update, 
                FindById,
                Delete, 
                TransformStringToDate,
                CalculateAmount, 
                FindAll,
                CalculateRentedHours,
                GetUserIdByEmail,
                GetOwnerId,
                FindBookingInProgress,
                VerifyPlateWithoutBooking],
  exports: [BookingsService]
})
export class BookingsModule {}
