import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { BookingsModule } from './bookings/bookings.module';
import { SlotsModule } from './slots/slots.module';
import { PropertiesModule } from './properties/properties.module';
import { Role } from './common/entities/role.entity';
import { DocumentType } from './common/entities/document_type.entity';
import { VehicleType } from './common/entities/vehicle_type.entity';
import { BookingState } from './common/entities/booking_state.entity';
import { Commune } from './common/entities/commune.entity';
import { FilesModule } from './files/files.module';




@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }),TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}', Role, DocumentType, VehicleType, BookingState, Commune],
    synchronize: false,
  }),UsersModule, BookingsModule, SlotsModule, PropertiesModule, AuthModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
