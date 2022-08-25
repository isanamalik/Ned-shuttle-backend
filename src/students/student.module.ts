import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentSchema } from './student.model';
import { NotificationSchema } from '../notifications/notification.model';
import { NotificationService } from '../notifications/notification.service';
import { FeeService } from '../fee/fee.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Notification', schema: NotificationSchema },
    ]),
  ],
  controllers: [StudentController],     
  providers: [StudentService, NotificationService, FeeService],
})
export class StudentModule {}
