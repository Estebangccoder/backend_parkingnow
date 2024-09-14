import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseBoolPipe,
} from "@nestjs/common";
import { SlotsService } from "./slots.service";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FilterAvailablesDto } from "./dto/filter-availables-slot.dto";

@ApiTags('Slots')
@Controller("slots")
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @ApiBody({ type: CreateSlotDto })
  @Post()
  create(@Body() createSlotDto: CreateSlotDto) {
    return this.slotsService.create(createSlotDto);
  }

  @Get()
  findAll() {
    return this.slotsService.findAll();
  }

  @Get("findById/:id")
  findOne(@Param("id") id: string) {
    return this.slotsService.findOne(id);
  }

  // @ApiQuery({type: FilterAvailablesDto})
  @Get("available")
  async getAvailableSlots(@Query() filterAvailables: FilterAvailablesDto) {

    return this.slotsService.findAvailableSlotsByFilters(filterAvailables);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotsService.update(id, updateSlotDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.slotsService.remove(id);
  }
}
