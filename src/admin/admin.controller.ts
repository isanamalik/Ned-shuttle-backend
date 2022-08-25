import { AdminService } from './admin.service';
import { NotificationService } from '../notifications/notification.service';
import { FeeService } from '../fee/fee.service';
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly AdminService: AdminService,
    private readonly NotificationService: NotificationService,
    private readonly feeService: FeeService
  ) {}

  @Post('signup')
  async reg_admin(
    @Body('ad_name') ad_name: string,
    @Body('ad_reg_num') ad_reg_number: string,
    @Body('password') password: string
  ) {
    const generatedId = await this.AdminService.insert_admin_data(
      ad_name,
      ad_reg_number,
      password
    );
    return { id: generatedId };
  }

  @Post('login')
  async login_admin(
    @Body('ad_reg_num') ad_reg_number: string,
    @Body('password') password: string
  ) {
    const generatedId = await this.AdminService.login(ad_reg_number, password);
    return generatedId;
  }

  @Post('push_notification')
  async push_notification(
    @Body('notification_message') message: string,
    @Body('title') title: string,
    @Body('timestamp') timestamp
  ) {
    const notification_id = await this.NotificationService.create_notification(
      timestamp,
      message,
      title
    );
    return { _id: notification_id };
  }

  @Post('delete_notification')
  async delete_notification(@Body('_id') _id: String) {
    const delete_id = await this.NotificationService.delete_notification(_id);
    return { delete_id };
  }

  @Post('insert_fee')
  async insert_fee(
    @Body('st_reg_number') st_reg_number: string,
    @Body('paid_date') paid_date: string,
    @Body('fee_status') fee_status: string,
    @Body('paid_month') paid_month: string
  ) {
    const res = await this.feeService.insert_fee_status(
      st_reg_number,
      paid_date,
      fee_status,
      paid_month
    );
    return res;
  }

  @Post('update_fee')
  async update_fee(
    @Body('st_reg_number') st_reg_number: string,
    @Body('paid_date') paid_date: string,
    @Body('fee_status') fee_status: string,
    @Body('paid_month') paid_month: string
  ) {
    const res = await this.feeService.update_fee_status(
      st_reg_number,
      paid_date,
      fee_status,
      paid_month
    );
    return res;
  }

  @Post('update_notification')
  async update_notification(
    @Body('_id') _id: String,
    @Body('notification_message') message: string,
    @Body('title') title: string,
    @Body('timestamp') timestamp
  ) {
    const delete_id = await this.NotificationService.delete_notification(_id);
    const notification_id = await this.NotificationService.create_notification(
      timestamp,
      message,
      title
    );
    return { _id: notification_id };
  }
  @Get('get_fee_status/:id')
  async get_fee_status(@Param('id') st_reg_number) {
    const student_list = await this.feeService.get_fee_status(st_reg_number);
    return student_list;
  }
}
