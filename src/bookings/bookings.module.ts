import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from './entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotsModule } from 'src/slots/slots.module'; 
import { CacheModule } from '@nestjs/cache-manager';
import { UsersModule } from 'src/users/users.module';
import {  Create,
          Terminate,
          FindInProgressByDriver,
          FindInProgressByOwnerId,
          VerifyPlateWithoutBooking,
          CacheManager,
          FindById,
          Delete,
          CalculateAmount,
          FindAll,
          CalculateRentedHours,
          GetUserIdByEmail,
          GetOwnerId} from './services';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([Booking]), SlotsModule, UsersModule],
  controllers: [BookingsController],
  providers: [  BookingsService,
                Terminate,
                FindInProgressByDriver,
                FindInProgressByOwnerId,
                VerifyPlateWithoutBooking,
                CacheManager,
                Create,
                Delete, 
                FindById,
                CalculateAmount, 
                FindAll,
                CalculateRentedHours,
                GetUserIdByEmail,
                GetOwnerId],
  exports: [BookingsService]
})
export class BookingsModule {}
