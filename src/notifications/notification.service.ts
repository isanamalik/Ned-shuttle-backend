import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Notification } from './notification.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<Notification>
  ) {}

  async create_notification(timestamp: Date, message: String, title: String) {
    console.log('Creating a new notification in the database');
    const newRecord = new this.notificationModel({
      timestamp,
      message,
      title,
    });
    const result = await newRecord.save();
    return result.id as string;
  }

  async find_notification(_id: String) {
    const doc = await this.notificationModel.findById(_id);
    return _id;
  }

  async delete_notification(_id: String) {
    console.log('Attempting to delete notification');
    const doc = await this.notificationModel.findByIdAndDelete(_id);
    return doc;
  }

  async get_all() {
    console.log('Retriving top 10 notifications');
    const docs = await this.notificationModel
      .find()
      .sort({ createdAt: -1 })
      .limit(10);
    return docs;
  }
}
