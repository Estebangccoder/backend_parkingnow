import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Req,
} from "@nestjs/common";
import { SlotsService } from "./slots.service";
import { CreateSlotDto } from "./dto/create-slot.dto";
import { UpdateSlotDto } from "./dto/update-slot.dto";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FilterAvailablesDto } from "./dto/filter-availables-slot.dto";
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enums/rol.enum';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { RequestWithUser } from "src/common/interfaces/request-with-user.interface";

@ApiTags('Slots')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles(Role.USER)
@Controller("slots")
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a slot' })
  @ApiBody({ type: CreateSlotDto })
  create(@Body() createSlotDto: CreateSlotDto, @Req() req: RequestWithUser) {
    return this.slotsService.create(createSlotDto, req.user.email);
  }

  @Post("/createMany")
  @ApiBody({ type: [CreateSlotDto] })
  @ApiOperation({ summary: 'Create a list of slots' })
  createMany(@Body() createSlotDto: CreateSlotDto[], @Req() req: RequestWithUser) {
    return this.slotsService.createMany(createSlotDto, req.user.email);
  }

  @Get()
  @ApiOperation({ summary: 'Get all slots' })
  findAll() {
    return this.slotsService.findAll();
  }

  @Get("withProperty")
  @ApiOperation({ summary: 'Get all slots with the property info' })
  findAllWithPropertyInfo(){
    return this.slotsService.findAllWithProperty();
  }

  @Get("findById/:id")
  @ApiOperation({ summary: 'Get a slot by ID' })
  findOne(@Param("id") id: string) {
    return this.slotsService.findOne(id);
  }

  @Get("available")
  @ApiOperation({ summary: 'Get available slots by filters' })
  async getAvailableSlots(@Query() filterAvailables: FilterAvailablesDto) {
    return this.slotsService.findAvailableSlotsByFilters(filterAvailables);
  }

  @Patch(":id")
  @ApiOperation({ summary: 'Update a slot by ID' })
  update(@Param("id") id: string, @Body() updateSlotDto: UpdateSlotDto, @Req() req: RequestWithUser) {
    return this.slotsService.update(id, updateSlotDto, req.user.user_id);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete a slot by ID' })
  remove(@Param("id") id: string,  @Req() req: RequestWithUser) {
    return this.slotsService.remove(id, req.user.email);
  }
}
