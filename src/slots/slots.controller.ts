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
  UseGuards,
} from "@nestjs/common";
import { SlotsService } from "./slots.service";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FilterAvailablesDto } from "./dto/filter-availables-slot.dto";
import { Roles } from "src/auth/decorators/roles.decorators";
import { AuthGuard } from "src/auth/guard/auth.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Role } from "src/auth/enums/rol.enum";

@ApiTags('Slots')
@ApiBearerAuth()
@Controller("slots")
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @ApiBody({ type: CreateSlotDto })
  @Post()
  create(@Body() createSlotDto: CreateSlotDto) {
    return this.slotsService.create(createSlotDto);
  }

  // @Roles(Role.USER)
  // @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.slotsService.findAll();
  }

  @Get("findById/:id")
  findOne(@Param("id") id: string) {
    return this.slotsService.findOne(id);
  }

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
