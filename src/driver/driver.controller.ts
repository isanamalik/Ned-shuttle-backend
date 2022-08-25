import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { DriverService } from './driver.service';

@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {
    console.log('Here');
  }

  @Post('signup')
  async signup(
    @Body('driver_id') driver_id: string,
    @Body('password') password: string
  ) {
    const signup_object = await this.driverService.signup(driver_id, password);

    return signup_object;
  }

  @Post('signin')
  async signin(
    @Body('driver_id') driver_id: string,
    @Body('password') pwd: string
  ) {
    const login = await this.driverService.signin(driver_id, pwd);
    return { login };
  }
}
