import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LocationController } from './driver_location.controller';
import { LocationService } from './driver_location.service';
import { DriverService } from '../driver/driver.service';
import { DriverSchema, LocationSchema } from './driver_location.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Driver', schema: DriverSchema }]),
    MongooseModule.forFeature([{ name: 'Location', schema: LocationSchema }]),
  ],
  controllers: [LocationController],
  providers: [DriverService, LocationService],
})
export class LocationModule {}
