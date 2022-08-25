import * as mongoose from 'mongoose';

export const NotificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: { createdAt: 'createdAt' } }
);

export interface Notification extends mongoose.Document {
  timestamp: Date;
  title: string;
  message: string;
}
