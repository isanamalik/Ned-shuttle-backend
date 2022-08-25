import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { LocationService } from './driver_location.service';
import { DriverService } from '../driver/driver.service';

@Controller()
export class LocationController {
  constructor(
    private readonly LocationService: LocationService,
    private readonly driverService: DriverService
  ) {}

  @Post('push_location')
  async addProduct(
    @Body('latitude') latitude: string,
    @Body('longitude') longitude: string,
    @Body('driver_id') driver_id: string
  ) {
    const generatedId = await this.LocationService.updateLocation(
      latitude,
      longitude,
      driver_id
    );
    return { id: generatedId };
  }

  @Post('get_location')
  async get_location(@Body('driver_id') driver_id: string) {
    const driver_location = await this.LocationService.get_location(driver_id);

    if (driver_location != null) {
      return { id: driver_location };
    } else {
      return { msg: 'Tracking id not found in the database' };
    }
  }
}
