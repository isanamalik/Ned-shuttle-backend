import * as mongoose from 'mongoose';

export const RouteSchema = new mongoose.Schema({
  route_id: { type: String, required: true },
  route_locations: [{ type: String, required: true }]

});

export interface Route extends mongoose.Document {
  route_id: string;
  route_locations: string;
}
