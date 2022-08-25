import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Payment } from './payments.model';

@Injectable()
export class PaymentService {
    constructor(
        @InjectModel('Payment') private readonly paymentModel: Model<Payment>
    ) {}

    async addNewPayment(
        payment_id: string ,
        st_reg_number: string ,
        driver_id: string ,
        ad_reg_number: string ,
        route_id: string ,
        payment_type: string ,
        total_cost: string ,
        is_paid: boolean 
        ) {
        const newRecord = new this.paymentModel({
            payment_id: payment_id ,
            st_reg_number: st_reg_number ,
            driver_id: driver_id ,
            ad_reg_number: ad_reg_number ,
            route_id: route_id ,
            payment_type: payment_type ,
            total_cost: total_cost ,
            is_paid: is_paid 
        });
        const result = await newRecord.save();
        return result.id as string;
    }

    async getPaymentsByStdRegNumber(st_reg_number: string) {

        const record = await this.paymentModel.findOne({st_reg_number: st_reg_number}, (error, doc) => {
            if (!error) {
                return doc;
            }
        });
        return record;
    }

    async getAllRecord() {
        const records = await this.paymentModel.find({}, (error, doc ) => {
            if (!error) {
                return doc;
            }
        });
        return records;
    }
}