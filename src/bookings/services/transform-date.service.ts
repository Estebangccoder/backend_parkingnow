import { Injectable } from "@nestjs/common";


@Injectable()
export class TransformStringToDate{

    transformToDate(timestamp: string){
        const newDate = new Date(timestamp)
        return newDate;
    }
}