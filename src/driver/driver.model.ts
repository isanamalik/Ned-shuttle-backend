import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
  driver_id: { type: String, required: true },
  password: { type: String, required: true },
});

export interface Driver extends mongoose.Document {
  driver_id: string;
  password: string;
}
