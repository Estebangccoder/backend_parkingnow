import { Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto, ReceiveBookingDataDto  } from './dto';
import { Create, Update, FindById, Delete, TransformStringToDate } from './services';

@Injectable()
export class BookingsService {
  constructor(
    private readonly createBooking: Create,
    private readonly updateBooking: Update,
    private readonly findById: FindById,
    private readonly softDelete: Delete,
    private readonly transform: TransformStringToDate// transformar datos de 'string' a 'Date'
  ){}
  
  async create(receivedBookingData: ReceiveBookingDataDto) {

    const {start_date_time, vehicle_plate, driver_id, owner_id, slot_id } = receivedBookingData;

    const new_start_date_time : Date = this.transform.transformToDate(start_date_time);
//CreateBookingDto: define la estructura del objeto a guardar en la DB.
    const createBookingData: CreateBookingDto = new CreateBookingDto(new_start_date_time, vehicle_plate, owner_id, driver_id, slot_id);

    return await this.createBooking.create(createBookingData);
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
