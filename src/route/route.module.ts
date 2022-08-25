import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RouteController } from './route.controller';
import { RouteService,  } from './route.service'
import { Route,RouteSchema } from './route.model'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Route', schema: RouteSchema }]),

  ],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModelule {}
