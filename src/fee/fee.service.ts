import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student } from '../students/student.model';

@Injectable()
export class FeeService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>
  ) {}

  async insert_fee_status(
    st_reg_number: string,
    paid_date: string,
    fee_status: string,
    paid_month: string
  ) {
    const req = {
      paid_date,
      paid_date_timestamp: Date.parse(paid_date),
      fee_status: fee_status,
      paid_month: paid_month,
    };

    console.log(Date.parse(paid_date));

    const check_st_fee_status = await this.studentModel.findOne({
      $and: [
        { st_reg_number },
        { fee_history: { $elemMatch: { paid_date: paid_date } } },
      ],
    });

    if (check_st_fee_status) {
      console.log({ msg: 'Fee paid already' });
      return { msg: 'Fee paid already' };
    }

    const check_st_rec = await this.studentModel.findOne({ st_reg_number });

    if (check_st_rec) {
      const resp = await this.studentModel.findOneAndUpdate(
        {
          $and: [{ st_reg_number }],
        },
        { $push: { fee_history: req } },
        { new: true }
      );
      return resp.save();
    }
    return { msg: 'Record not found, please enter a valid ID' };
  }

  async update_fee_status(
    st_reg_number: string,
    paid_date: string,
    fee_status: string,
    paid_month: string
  ) {
    const req = {
      paid_date,
      paid_date_timestamp: Date.parse(paid_date),
      fee_status: fee_status,
      paid_month: paid_month,
    };

    console.log(Date.parse(paid_date));

    const check_st_fee_status = await this.studentModel.findOne({
      $and: [
        { st_reg_number },
        { fee_history: { $elemMatch: { paid_date: paid_date } } },
      ],
    });

    if (check_st_fee_status) {
      console.log({ msg: 'Fee paid already' });
      const resp = await this.studentModel.findOneAndUpdate(
        {
          $and: [
            { st_reg_number },
            { fee_history: { $elemMatch: { paid_date: paid_date } } },
          ],
        },
        {
          $set: {
            'fee_history.$.fee_status': fee_status,
          },
        }
        // { new: true }
      );
      return resp.save();
      // return { msg: 'Fee paid already' };
    }

    const check_st_rec = await this.studentModel.findOne({ st_reg_number });

    if (check_st_rec) {
    }
    return { msg: 'Record not found, please enter a valid ID' };
  }

  async get_fee_status(st_reg_number: string) {
    // const doc = await this.studentModel.find({
    //   $and: [
    //     { 'fee_history.paid_date': '2021-01' },
    //     { st_reg_number: '4001096' },
    //   ],
    // }); //.sort('fee_history:paid_date_timestamp': -1);

    const docs = await this.studentModel.aggregate(
      // [{ $sort: { 'fee_history.paid_date': -1 } }]
      [
        {
          $match: {
            st_reg_number,
          },
        },
        { $unwind: '$fee_history' },
        {
          $sort: {
            'fee_history.paid_date_timestamp': -1,
          },
        },
      ]
    );
    return docs;
  }
}
