import { Injectable } from "@nestjs/common";
import { SlotsService } from "src/slots/slots.service";
import { Slot } from "src/slots/entities/slot.entity";


@Injectable()
export class GetOwnerId {
    constructor(
        private readonly slotsService: SlotsService
    ){}

    async getOwnerId(slotId: string): Promise<string> {
        const slot: Slot = await this.slotsService.findOne(slotId);
        return slot.owner_id;
    }
}