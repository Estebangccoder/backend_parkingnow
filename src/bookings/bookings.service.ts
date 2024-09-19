import { Injectable, ForbiddenException, BadRequestException, HttpException, HttpStatus} from'@nestjs/common';
import { CreateBookingDto, UpdateBookingDto, ReceiveBookingDataDto, EndDateDataDto  } from './dto';
import { SlotsService } from 'src/slots/slots.service';
import { FindAll } from './services/find-all.service';
import { Booking } from './entities/booking.entity';
import { error, log } from 'console';
import { Slot } from 'src/slots/entities/slot.entity';
import { Create, 
        //Terminate, 
        FindById, 
        Delete, 
        CalculateAmount,
        CalculateRentedHours,
        GetUserIdByEmail,
        GetOwnerId, 
        FindBookingInProgress,
        VerifyPlateWithoutBooking,
        CacheManager} from './services';


@Injectable()
export class BookingsService {
  constructor(
    private readonly createBooking: Create,
    //private readonly terminateBooking: Terminate,
    private readonly findAllBookings: FindAll,
    private readonly findById: FindById,
    private readonly softDelete: Delete,
    private readonly slotsService: SlotsService,
    private readonly calculateAmount: CalculateAmount,
    private readonly calculateHours: CalculateRentedHours,
    private readonly getUserIdByEmail: GetUserIdByEmail,
    private readonly getOwnerId: GetOwnerId,
    private readonly getInProgress: FindBookingInProgress,
    private readonly veryfyPlate: VerifyPlateWithoutBooking,
    private readonly cacheManager: CacheManager
  ){}
  
    async create(receivedBookingData: ReceiveBookingDataDto, userEmail: string ) {

      //get the driver's ID
      const driverId: string = await this.getUserIdByEmail.get(userEmail);

      //unstructure data
      const {start_date_time, vehicle_plate, slot_id } = receivedBookingData;

      //Check if the slot has a booking in progress
      const reservedSlot = await this.slotsService.findOne(slot_id)
      if(reservedSlot.is_available === false){
        throw new HttpException(
                                'The slot is not available', 
                                HttpStatus.BAD_REQUEST)  
      }

      //Check if the driver has a booking in progress
      let bookingInProgress = await this.getInProgress.find(driverId);
      if(bookingInProgress !== null){
        throw new HttpException(
                                "The driver has already a booking in progress", 
                                HttpStatus.BAD_REQUEST)  
      }

      //Check if the vehicle's plate is already in a booking in progress.
      bookingInProgress = await this.veryfyPlate.veryfy(vehicle_plate);
      if(bookingInProgress !== null){
        throw new HttpException(
                                "the vehicle plate is already in a booking in progress", 
                                HttpStatus.BAD_REQUEST)
      }
      
      //transform the date of start to 'Date' type
      const startDateTime : Date = new Date(start_date_time);

      //Get the slot's ownerId
      const ownerId: string = await this.getOwnerId.get(slot_id);

      //CreateBookingDto: defines the structure of the object to be saved in the DB.
      const createBookingData: CreateBookingDto = new CreateBookingDto( startDateTime, 
                                                                        vehicle_plate, 
                                                                        ownerId, 
                                                                        driverId, 
                                                                        slot_id);
      return await this.createBooking.create(createBookingData);
    }

    async returnAmountAndHours(data: EndDateDataDto, userEmail: string) {
      
      //get the user's Id
      const userId: string = await this.getUserIdByEmail.get(userEmail);

      const {end_date_time, booking_id} = data;

      const bookingFound: Booking = await this.findById.find(booking_id);

      const driverId: string = bookingFound.driver_id;
      const slotId: string = bookingFound.slot_id;

      const ownerId: string = await this.getOwnerId.get(slotId);
      
      /*Verify that the user in the token is the driver who made the booking
        or the owner of the slot*/
      if(userId !== driverId && userId !== ownerId){
        throw new HttpException(
                                "Unauthorized Action", 
                                HttpStatus.UNAUTHORIZED)
      }

      //Verify that the booking is in progress.
      if(bookingFound.booking_state_id === 2){
        throw new HttpException(
                                "Booking already finished", 
                                HttpStatus.BAD_REQUEST)
      }

      //transformar la fecha y hora final a un dato de tipo Date
      const endDateTime: Date = new Date(end_date_time);

      const startDateTime: Date = bookingFound.start_date_time;

      const slot: Slot = await this.slotsService.findOne(slotId);
      const slotPrice: number = slot.hour_price;

      let totalHours: number = this.calculateHours.calculate(startDateTime, endDateTime);
      totalHours = parseFloat(totalHours.toFixed(1));

      let amount: number = this.calculateAmount.calculate(totalHours, slotPrice);
      amount = Math.floor(amount);
      
      //Set to cache the amount, total hours and end date, with a lifetime of 2 minutes.
      this.cacheManager.setToCache('amount', amount, 120, "Error setting amount to cache");
      this.cacheManager.setToCache('totalHours', totalHours, 120, "Error setting total hours to cache");
      this.cacheManager.setToCache('endDateTime', endDateTime, 120, "Error setting end date time to cache");
      return {amount, totalHours};
    }

    async findBookingInProgressByDriver(userEmail: string): Promise<Booking>{
        const driverId: string = await this.getUserIdByEmail.get(userEmail);
        return this.getInProgress.find(driverId);
    }
    
    async findAll() {
      return await this.findAllBookings.findAll();
    }

    findOne(id: string) {
      return this.findById.find(id)
    }

    async terminate() {
      
    }

    async delete(id: string) {
      return await this.softDelete.delete(id)
    }
}
