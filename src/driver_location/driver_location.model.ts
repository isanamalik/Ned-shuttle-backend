import * as mongoose from 'mongoose';

export const DriverSchema = new mongoose.Schema({
  driverName: { type: String, required: true },
  busRegNumber: { type: String, required: true },
  routeNumber: { type: String, required: true },
});

export interface Driver extends mongoose.Document {
  driverName: string;
  busRegNumber: string;
  routeNumber: string;
}

export const LocationSchema = new mongoose.Schema({
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
  driver_id: { type: String, required: true },
  location_history: [{ type: Object, required: true }],
});

export interface Location extends mongoose.Document {
  latitude: string;
  longitude: string;
  driver_id: string;
  location_history: [object];
}
