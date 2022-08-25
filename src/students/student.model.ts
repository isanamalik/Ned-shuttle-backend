import * as mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
  st_name: { type: String, required: true },
  st_reg_number: { type: String, required: true },
  st_department: { type: String, required: true },
  st_access_cred: { type: String, required: true },
  fee_status: { type: String, required: true },
  password: { type: String, required: true },
  fee_history: [{ type: Object, required: true }],
});

export interface Student extends mongoose.Document {
  st_name: string;
  st_reg_number: string;
  st_department: string;
  st_access_cred: string;
  fee_status: string;
  password: string;
  fee_history: [object];
}
