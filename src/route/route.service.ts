import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Route } from './route.model'

@Injectable()
export class RouteService{
    constructor (@InjectModel('Route') private readonly RouteModel: Model<Route>) {}

  async add_route(route_id: string, route_locations: string[]){
    const val = await this.find_route(route_id);
    if (val == null)
      {
        const newRecord = new this.RouteModel(
              {
                route_id,
                route_locations,
                  
              })
        const result = await newRecord.save();
        return {msg:"Route added succesfully"}
      }
  
      return {msg: "Route already exists"}
  }

  async find_route(route_id: string)
  {
    return await this.RouteModel.findOne({route_id});     
  }
  async find_all_route()
  {
    return await this.RouteModel.findOne({});     
  }
  async find_by_name(route_locations)
  {
    var regex = new RegExp([route_locations].join(""), "i");
    return await this.RouteModel.find({"route_locations" : regex});
  }
  
}
