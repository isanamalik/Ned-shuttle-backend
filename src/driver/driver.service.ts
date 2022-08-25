import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Driver, DriverSchema } from './driver.model';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel('Driver') private readonly driverModel: Model<Driver>
  ) {}

  async signup(driver_id: string, password: string) {
    let query = await this.driverModel.findOne({ driver_id });
    if (query) {
      console.log('Record found');
      return { msg: 'Id already exists' };
    } else {
      console.log('Record not found');
      const newRecord = new this.driverModel({
        driver_id,
        password,
      });
      const result = await newRecord.save();
      return { result };
    }
  }

  async signin(driver_id: string, password: string) {
    const rec = await this.driverModel.findOne({ driver_id, password });
    if (rec) {
      return { msg: 'Login Successful' };
    }
    return { msg: 'login failed' };
  }
}
