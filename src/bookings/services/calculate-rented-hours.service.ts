import { Injectable } from "@nestjs/common";

@Injectable()
export class CalculateRentedHours{

    calculate(startDateTime: Date, endDateTime: Date): number{
        const start: number = startDateTime.getTime();
        const end: number = endDateTime.getTime();

        const differenceInMilliseconds = end - start;
        const differenceInHours: number = differenceInMilliseconds / 3600000;
        return differenceInHours;
    } 
}
