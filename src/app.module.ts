import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './students/student.module';
import { LocationModule } from './driver_location/driver_location.module';
import { AdminModule } from './admin/admin.module';
import { RouteModelule } from './route/route.module';
import { DriverModule } from './driver/driver.module';
import { PaymentModule } from './payments/payments.module';

@Module({
  imports: [
    StudentModule,
    DriverModule,
    AdminModule,
    RouteModelule,
    LocationModule,
    PaymentModule,
    MongooseModule.forRoot(
      'mongodb+srv://products:test123@st-ned.qwobl.mongodb.net/st-ned?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
