import { Injectable, HttpException } from "@nestjs/common";
import { SlotsService } from "src/slots/slots.service";
import { Slot } from "src/slots/entities/slot.entity";


@Injectable()
export class GetOwnerId {
    constructor(
        private readonly slotsService: SlotsService
    ){}

    async getOwnerId(slotId: string): Promise<string> {
        try {
            const slot: Slot = await this.slotsService.findOne(slotId);
            return slot.owner_id;
        } catch (error) {
            throw new HttpException(
                error.message || "Error finding ownerId",
                error.status || 500
              );
        }
    }
}