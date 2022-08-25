import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';

import { StudentService } from './student.service';
import { NotificationService } from '../notifications/notification.service';
import { FeeService } from '../fee/fee.service';

// st_name
// st_reg_number
// st_department
// st_access_cred
// fee_status

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly notificationService: NotificationService,
    private readonly feeService: FeeService
  ) {}
  @Post('insert')
  async regStudent(
    @Body('st_name') st_name: string,
    @Body('st_reg_number') st_reg_number: string,
    @Body('st_department') st_department: string,
    @Body('st_access_cred') st_access_cred: string,
    @Body('fee_status') fee_status: string,
    @Body('password') password: string
  ) {
    const generatedId = await this.studentService.insertSTRecord(
      st_name,
      st_reg_number,
      st_department,
      st_access_cred,
      fee_status,
      password
    );
    return { id: generatedId };
  }
  @Patch('update')
  async updateStudent(
    @Body('st_name') st_name: string,
    @Body('st_reg_number') st_reg_number: string,
    @Body('st_department') st_department: string,
    @Body('st_access_cred') st_access_cred: string,
    @Body('fee_status') fee_status: string
  ) {
    const record = await this.studentService.getRecord(st_reg_number);
    if (record == null) {
      console.log('student record not found');
      return { msg: 'Student record not found' };
    }
    let data = { ...record };
    console.log(data);
    return data;
    // const generatedId = await this.studentService.updateRecord(
    //     st_reg_number
    // );
  }

  @Post('read')
  async getStudent(@Body('st_reg_number') st_reg_number: string) {
    console.log(st_reg_number);
    const generatedId = await this.studentService.getRecord(st_reg_number);

    return { id: generatedId };
  }

  //  Post api
  //  POST localhost:3000/student/login
  @Post('login')
  async signIn(
    // Mandatory Params
    @Body('st_reg_number') st_reg_number: string,
    @Body('password') password: string
  ) {
    const resp = await this.studentService.signIn(st_reg_number, password);

    return resp;
  }

  @Post('get/:id')
  async getStudentById(@Param('id') st_reg_number) {
    console.log(st_reg_number);
    const generatedId = await this.studentService.getRecord(st_reg_number);

    return { id: generatedId };
  }

  @Get('get_notifications')
  async get_notifications() {
    const notifications = await this.notificationService.get_all();
    return notifications;
  }
  @Get('get_fee_status/:id')
  async get_fee_status(@Param('id') st_reg_number) {
    const student_list = await this.feeService.get_fee_status(st_reg_number);
    return student_list;
  }
}
