import { Module } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entities/slot.entity';
import { User } from 'src/users/entities/user.entity';
import { VehicleType } from 'src/common/entities/vehicle_type.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Slot, VehicleType]), UsersModule
  ],
  controllers: [SlotsController],
  providers: [SlotsService],
  exports:[SlotsService]
})
export class SlotsModule {}
