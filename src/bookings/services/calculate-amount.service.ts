import { Injectable } from "@nestjs/common";

@Injectable()
export class CalculateAmount{

    calculate(totalTime: number, price: number){
        const amount: number = totalTime * price;
    }
}