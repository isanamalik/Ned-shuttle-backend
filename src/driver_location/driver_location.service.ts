import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Driver, Location } from './driver_location.model';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel('Location') private readonly locationModel: Model<Location>
  ) {}

  async updateLocation(latitude: string, longitude: string, driver_id: string) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let date_today = mm + '/' + dd + '/' + yyyy;
    const d_id_date = driver_id.toString() + date_today.toString();

    const req = {
      latitude,
      longitude,
    };

    let res = await this.locationModel.findOne({ driver_id: d_id_date });
    if (!res) {
      const new_rec = await new this.locationModel({
        driver_id: d_id_date,
        location_history: [req],
        longitude,
        latitude,
      });
      return new_rec.save();
    }

    const loc_update = await this.locationModel.findOneAndUpdate(
      { driver_id: d_id_date },
      { $push: { location_history: req } },
      { new: true }
    );
    return loc_update.save();
  }
  async get_location(driver_id: string) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let date_today = mm + '/' + dd + '/' + yyyy;
    const d_id_date = driver_id.toString() + date_today.toString();

    let res = await this.locationModel.findOne({ driver_id: d_id_date });
    console.log(res);
    return res;
  }
}
