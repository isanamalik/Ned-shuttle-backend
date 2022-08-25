import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Admin } from './admin.model';
import { Student } from '../students/student.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('Student') private readonly studentModel: Model<Student>
  ) {}

  async insert_admin_data(
    ad_name: string,
    ad_reg_number: string,
    password: string
  ) {
    const val = await this.find_data(ad_reg_number);
    if (val == null) {
      const newRecord = new this.adminModel({
        ad_name,
        ad_reg_number,
        password,
      });
      const result = await newRecord.save();
      return ad_reg_number as string;
    }

    return { msg: 'Account already exists, Please login!' };
  }

  async find_data(ad_reg_number: string) {
    return await this.adminModel.findOne({ ad_reg_number });
  }

  async login(ad_reg_number: string, password: string) {
    const val = await this.find_data(ad_reg_number);
    if (val == null) {
      return { msg: 'User not found pleas sign up' };
    }
    if (val.password == password) {
      return { msg: 'login succesful' };
    } else {
      return { msg: 'Invalid credentials' };
    }
  }


}
