import { Injectable, HttpException, HttpStatus} from'@nestjs/common';
import { CreateBookingDto, TerminateBookingDto, ReceiveBookingDataDto, EndDateDataDto  } from './dto';
import { SlotsService } from 'src/slots/slots.service';
import { Booking } from './entities/booking.entity';
import { Slot } from 'src/slots/entities/slot.entity';
import { Property } from 'src/properties/entities/property.entity';
import { Create, 
        FindAll,
        Terminate, 
        FindById, 
        Delete, 
        CalculateAmount,
        CalculateRentedHours,
        GetUserIdByEmail,
        GetOwnerId, 
        FindInProgressByDriver,
        VerifyPlateWithoutBooking,
        CacheManager,
        FindInProgressByOwnerId} from './services';

@Injectable()
export class BookingsService {
  constructor(
    private readonly createBooking: Create,
    private readonly terminateBooking: Terminate,
    private readonly findAllBookings: FindAll,
    private readonly findById: FindById,
    private readonly softDelete: Delete,
    private readonly slotsService: SlotsService,
    private readonly calculateAmount: CalculateAmount,
    private readonly calculateHours: CalculateRentedHours,
    private readonly getUserIdByEmail: GetUserIdByEmail,
    private readonly getOwnerId: GetOwnerId,
    private readonly getInProgressByDriver: FindInProgressByDriver,
    private readonly veryfyPlate: VerifyPlateWithoutBooking,
    private readonly cacheManager: CacheManager,
    private readonly getInProgressByOwner: FindInProgressByOwnerId
  ){}
  
    async create(receivedBookingData: ReceiveBookingDataDto, userEmail: string ) {

      //get the driver's ID
      const driverId: string = await this.getUserIdByEmail.get(userEmail);

      //unstructure data
      let {start_date_time, vehicle_plate, slot_id } = receivedBookingData;

      //Check if the slot has a booking in progress
      const slot = await this.slotsService.findOne(slot_id);
      if(slot.is_available === false){
        throw new HttpException(
                                'The slot is not available', 
                                HttpStatus.BAD_REQUEST)  
      }

      //Check if the driver has a booking in progress
      let bookingInProgress = await this.getInProgressByDriver.find(driverId);
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
                                                                        vehicle_plate.toUpperCase(), 
                                                                        ownerId, 
                                                                        driverId, 
                                                                        slot_id);
      const createBookingResponse: Booking = await this.createBooking.create(createBookingData);
      
      if(createBookingResponse){
          const slotUpdateResponse = await this.slotsService.updateSlotAvailability(slot_id, false);   
  
          if(slotUpdateResponse === true){
            return createBookingResponse;
          }      
       }
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

      if(totalHours < 1){
        totalHours = 1;
      }

      let amount: number = this.calculateAmount.calculate(totalHours, slotPrice);
      amount = Math.floor(amount);
      
      //Set to cache the amount, total hours and end date, with a lifetime of 2 minutes.
      await this.cacheManager.setToCache('amount', amount, 180000, "Error setting amount to cache");
      await this.cacheManager.setToCache('totalHours', totalHours, 180000, "Error setting total hours to cache");
      await this.cacheManager.setToCache('endDateTime', endDateTime, 180000, "Error setting end date time to cache");
      await this.cacheManager.setToCache('bookingId', booking_id, 180000, "Error setting bookingId to cache");
      await this.cacheManager.setToCache('slotId', slotId, 180000, "Error setting slotId to cache");
      return {amount, totalHours};
    }

    async findBookingInProgressByDriver(driverId: string){
        const booking: Booking = await this.getInProgressByDriver.find(driverId);
        if(!booking){
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const bookingId: string = booking.id;
        const slotId: string = booking.slot_id; 
        const property: Property = booking.slot.property;
        return {bookingId, slotId, property};
    }

    async findBookingInProgressByOwner(userEmail: string): Promise<Booking[]>{
      const ownerId: string = await this.getUserIdByEmail.get(userEmail);
      return await this.getInProgressByOwner.find(ownerId);
    }
    
    async findAll(){
      return await this.findAllBookings.findAll();
    }

    findOne(id: string) {
      return this.findById.find(id)
    }

    async terminate(userEmail: string) {

      //Get from cache the amount, total hours, end date, bookingId and slotId 
      const amountStr = await this.cacheManager.getFromCache('amount', "Error getting amount to cache" );
      const rentedHoursStr = await this.cacheManager.getFromCache('totalHours', "Error getting total hours to cache");
      const endDateTimeStr: string = await this.cacheManager.getFromCache('endDateTime', "Error getting end date time from cache");
      const bookingId: string = await this.cacheManager.getFromCache('bookingId', "Error getting bookingId to cache");
      const slotId: string = await this.cacheManager.getFromCache('slotId', "Error getting slotId to cache");

      //transform data before saving to DB.
      const end_date_time: Date = new Date(endDateTimeStr);
      const rented_hours: number = Number(rentedHoursStr);
      const amount: number = Number(amountStr);
      const booking_state_id = 2;

      const data: TerminateBookingDto = new TerminateBookingDto(end_date_time,
                                                                rented_hours,
                                                                amount,
                                                                booking_state_id);
    
       const updateResult = await this.terminateBooking.terminate(bookingId, data);

       if(updateResult){
          const slotUpdateResponse = await this.slotsService.updateSlotAvailability(slotId, true);   
  
          if(slotUpdateResponse === true){
            return updateResult;
          }      
       }    
    }

    async delete(id: string) {
      return await this.softDelete.delete(id)
    }
}
