import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DriverController } from './driver.controller';
import { DriverService  } from './driver.service'
import { Driver,DriverSchema } from './driver.model'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Driver', schema: DriverSchema }]),

  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
