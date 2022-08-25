import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student } from './student.model';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student') private readonly studentModel: Model<Student>
  ) {}

  async insertSTRecord(
    st_name: string,
    st_reg_number: string,
    st_department: string,
    st_access_cred: string,
    fee_status: string,
    password: string
  ) {
    let query = await this.studentModel.findOne({ st_reg_number });

    if (query) {
      console.log('Record found');
      return { msg: 'Id already exists' };
    } else {
      console.log('Record not found');
      const newRecord = new this.studentModel({
        st_name: st_name,
        st_reg_number: st_reg_number,
        st_department: st_department,
        st_access_cred: st_access_cred,
        fee_status: fee_status,
        password: password,
      });
      const result = await newRecord.save();
      return result.id as string;
    }
  }

  async updateRecord(st_reg_number: string) {
    const temp = await this.studentModel.findOne(
      { st_reg_number: st_reg_number },
      function (err, docs) {
        if (!err) {
          console.log(docs);
          return { docs };
        }
      }
    );
    console.log(temp);
    return temp;
  }

  async getRecord(st_reg_number: string) {
    console.log(st_reg_number);
    const record = await this.studentModel.findOne(
      { st_reg_number: st_reg_number },
      function (err, docs) {
        if (!err) {
          console.log(docs);
          return { docs };
        }
      }
    );
    console.log(record);
    return record;
    // const result = await newRecord.save();
  }
  async signIn(st_reg_number: string, password: string) {
    const rec = await this.getRecord(st_reg_number);
    if (rec.password == password) {
      return { msg: 'login succeful' };
    }
    return { msg: 'login failed' };
  }
}
