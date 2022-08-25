import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminSchema } from './admin.model';
import { NotificationService } from '../notifications/notification.service';
import { NotificationSchema } from '../notifications/notification.model';
import { StudentSchema } from 'src/students/student.model';
import { FeeService } from '../fee/fee.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema },
      { name: 'Notification', schema: NotificationSchema },
      { name: 'Student', schema: StudentSchema },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, NotificationService, FeeService],
})
export class AdminModule {}
