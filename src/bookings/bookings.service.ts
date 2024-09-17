import { Injectable } from '@nestjs/common';
import { CreateBookingDto, UpdateBookingDto, ReceiveBookingDataDto, EndDateDataDto  } from './dto';
import { Create, Update, FindById, Delete, TransformStringToDate, CalculateAmount } from './services';
import { SlotsService } from 'src/slots/slots.service';
import { FindAll } from './services/find-all.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly createBooking: Create,
    private readonly updateBooking: Update,
    private readonly findAllBookings: FindAll,
    private readonly findById: FindById,
    private readonly softDelete: Delete,
    private readonly transform: TransformStringToDate,// transformar datos de 'string' a 'Date'
    private readonly slotsService: SlotsService,
    private readonly calculateAmount: CalculateAmount
  ){}
  
  async create(receivedBookingData: ReceiveBookingDataDto) {

    const {start_date_time, vehicle_plate, driver_id, owner_id, slot_id } = receivedBookingData;

    const new_start_date_time : Date = this.transform.transformToDate(start_date_time);
//CreateBookingDto: define la estructura del objeto a guardar en la DB.
    const createBookingData: CreateBookingDto = new CreateBookingDto(new_start_date_time, vehicle_plate, owner_id, driver_id, slot_id);

    return await this.createBooking.create(createBookingData);
  }

  async returnAmount(data: EndDateDataDto){
    const {end_date_time, booking_id} = data;

    const bookingFound = await this.findById.findBooking(booking_id);
    
    const slotId = bookingFound.slot_id;

    
    const slotPrice = (await this.slotsService.findOne(slotId)).hour_price;
    
    const amount: number = this.calculateAmount.calculate(5, slotPrice);
    return {amount};
  }

  async findAll() {
    return await this.findAllBookings.findAll();
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
