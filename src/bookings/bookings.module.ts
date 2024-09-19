import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotsModule } from 'src/slots/slots.module'; 
import { CacheModule } from '@nestjs/cache-manager';
import {  Create,
          FindById,
          CalculateAmount,
          FindAll,
          CalculateRentedHours,
          GetUserIdByEmail,
          GetOwnerId,
          FindBookingInProgress,
          VerifyPlateWithoutBooking,
          CacheManager,
          Delete} from './services';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Booking]), SlotsModule, UsersModule],
  controllers: [BookingsController],
  providers: [  BookingsService,
                Create,
                Delete, 
                FindById,
                CalculateAmount, 
                FindAll,
                CalculateRentedHours,
                GetUserIdByEmail,
                GetOwnerId,
                FindBookingInProgress,
                VerifyPlateWithoutBooking,
                CacheManager],
  exports: [BookingsService]
})
export class BookingsModule {}
