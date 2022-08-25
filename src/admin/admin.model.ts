import * as mongoose from 'mongoose';

export const AdminSchema = new mongoose.Schema({
  ad_name: { type: String, required: true },
  ad_reg_number: { type: String, required: true },
  password: { type: String, required: true }

});

export interface Admin extends mongoose.Document {
  ad_name: string;
  ad_reg_number: string;
  password: string;
    
}
