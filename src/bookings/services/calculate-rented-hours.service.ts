import { Injectable } from "@nestjs/common";

@Injectable()
export class CalculateRentedHours{

    calculate(startDateTime: Date, endDateTime: Date){
        const start = startDateTime.getTime();
        const end = endDateTime.getTime();

        const differenceInMilliseconds = end - start;
        const differenceInHours = differenceInMilliseconds / 3600000;
        return differenceInHours;
    } 
}
