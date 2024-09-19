import { Injectable, ForbiddenException, BadRequestException, HttpException, HttpStatus} from'@nestjs/common';
import { CreateBookingDto, UpdateBookingDto, ReceiveBookingDataDto, EndDateDataDto  } from './dto';
import { SlotsService } from 'src/slots/slots.service';
import { FindAll } from './services/find-all.service';
import { Booking } from './entities/booking.entity';
import { Create, 
  Terminate, 
  FindById, 
  Delete, 
  TransformStringToDate, 
  CalculateAmount,
  CalculateRentedHours,
  GetUserIdByEmail,
  GetOwnerId, 
  FindBookingInProgress,
  VerifyPlateWithoutBooking} from './services';
import { error, log } from 'console';

@Injectable()
export class BookingsService {
  constructor(
    private readonly createBooking: Create,
    private readonly terminateBooking: Terminate,
    private readonly findAllBookings: FindAll,
    private readonly findById: FindById,
    private readonly softDelete: Delete,
    private readonly transform: TransformStringToDate,// transformar datos de 'string' a 'Date'
    private readonly slotsService: SlotsService,
    private readonly calculateAmount: CalculateAmount,
    private readonly calculateHours: CalculateRentedHours,
    private readonly getUserId: GetUserIdByEmail,
    private readonly getOwnerId: GetOwnerId,
    private readonly getInProgress: FindBookingInProgress,
    private readonly veryfyPlate: VerifyPlateWithoutBooking
  ){}
  
    async create(receivedBookingData: ReceiveBookingDataDto, userEmail: string ) {

      //get the driver's ID
      const driverId: string = await this.getUserId.getUserId(userEmail);

      //unstructure data
      const {start_date_time, vehicle_plate, slot_id } = receivedBookingData;


      //Check if the slot has a booking in progress
      const reservedSlot = await this.slotsService.findOne(slot_id)
      if(reservedSlot.is_available === false){
        throw new HttpException('The slot is not available', HttpStatus.BAD_REQUEST)  
      }

      //Check if the driver has a booking in progress
      let bookingInProgress = await this.getInProgress.find(driverId);
      if(bookingInProgress !== null){
        throw new HttpException("The driver has already a booking in progress", HttpStatus.BAD_REQUEST)  
      }

      //Check if the vehicle's plate is already in a booking in progress.
      bookingInProgress = await this.veryfyPlate.veryfy(vehicle_plate);
      if(bookingInProgress !== null){
        throw new HttpException("the vehicle plate is already in a booking in progress", HttpStatus.BAD_REQUEST)
      }
      
      //transform the date of start to 'Date' type
      const new_start_date_time : Date = this.transform.transformToDate(start_date_time);

      //Get the slot's owner
      const ownerId: string = await this.getOwnerId.getOwnerId(slot_id);

      //CreateBookingDto: defines the structure of the object to be saved in the DB.
      const createBookingData: CreateBookingDto = new CreateBookingDto(new_start_date_time, 
                                                                          vehicle_plate, 
                                                                          ownerId, 
                                                                          driverId, 
                                                                          slot_id);
      return await this.createBooking.create(createBookingData);
    }

    async returnAmountAndHours(data: EndDateDataDto ){
      const {end_date_time, booking_id} = data;

      //transformar la fecha y hora final a un dato de tipo Date
      const endDateTime: Date = this.transform.transformToDate(end_date_time);


      const bookingFound: Booking = await this.findById.findBooking(booking_id);
      
      const slotId = bookingFound.slot_id;
      const startDateTime = bookingFound.start_date_time;
      
      const slotPrice: number = (await this.slotsService.findOne(slotId)).hour_price;

      let totalHours: number = this.calculateHours.calculate(startDateTime, endDateTime);
      totalHours = parseFloat(totalHours.toFixed(1)); 
      let amount: number = this.calculateAmount.calculate(totalHours, slotPrice);
      amount = Math.floor(amount);
      return {amount, totalHours};

    }

    async findBookingInProgressByDriver(userEmail: string): Promise<Booking>{
        const driverId: string = await this.getUserId.getUserId(userEmail);
        return this.getInProgress.find(driverId);
    }
    
    async findAll() {
      return await this.findAllBookings.findAll();
    }

    findOne(id: string) {
      return this.findById.findBooking(id)
    }

    static async terminate(booking: Booking, updateBookingDto: UpdateBookingDto) {
      
    }

    async delete(id: string) {
      return await this.softDelete.delete(id)
    }
}
