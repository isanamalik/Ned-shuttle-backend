import * as mongoose from 'mongoose';

export const paymentSchema = new mongoose.Schema({
    payment_id: { type: String, required: true },
    st_reg_number: { type: String, required: true },
    driver_id: { type: String, required: true },
    ad_reg_number: { type: String, required: true },
    route_id: { type: String, required: true },
    payment_type: { type: String, required: true },
    total_cost: { type: String, required: true },
    is_paid: { type: String, required: true },
})

export interface Payment extends mongoose.Document {
    payment_id: string;
    st_reg_number: string;
    driver_id: string;
    ad_reg_number: string;
    route_id: string;
    payment_type: string;
    total_cost: string;
    is_paid: boolean;
}