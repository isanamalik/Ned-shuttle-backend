import {
    Controller,
    Post,
    Body,
    Get,
    Param
  } from '@nestjs/common';

import { RouteService } from './route.service';


@Controller('route')
export class RouteController {
  constructor(private readonly RouteService: RouteService) {}

  @Post('add_route')
  async add_route(
    @Body('route_id') route_id: string,
    @Body('route_locations') route_location: string[]){
    
      const generatedId = await this.RouteService.add_route(route_id,route_location);
      return generatedId
  }

  @Get('get/:id')
  async get_route(@Param('id') id) {
  
      console.log(id);
      const generatedId = await this.RouteService.find_route(id);
      if (generatedId == null)
      {
        return{msg: "Route doesn't exist"}; 
      }
      return generatedId;
    }

  @Post('by_name')
  async get_by_name (@Body('route_location') route_location: string){
    const locations = await this.RouteService.find_by_name(route_location);
    if (locations)
    {
      return locations
    }
    return {msg: "Location not found in database"}
     

  }

}

