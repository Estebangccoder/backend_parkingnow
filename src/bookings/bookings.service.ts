import { Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto  } from './dto';
import { Create, Update, FindById, Delete } from './services';

@Injectable()
export class BookingsService {
  constructor(
    private readonly createBooking: Create,
    private readonly updateBooking: Update,
    private readonly findById: FindById,
    private readonly softDelete: Delete
  ){}
  
  async create(bookingData: CreateBookingDto) {
      return await this.createBooking.create(bookingData)
  }

  findAll() {
    return `This action returns all bookings`;
  }

  findOne(id: string) {
    return this.findById.findBooking(id)
  }

  async update(id: string, updateBookingDto: UpdateBookingDto) {
    const booking = await this.findById.findBooking(id);
    console.log("booking",booking);
     
    return this.updateBooking.update( booking, updateBookingDto)
  }

  async delete(id: string) {
    return await this.softDelete.delete(id)
  }
}
