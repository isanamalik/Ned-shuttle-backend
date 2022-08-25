import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { get } from 'http';

import { PaymentService } from './payments.service';

// payment_id: string;
// st_reg_number: string;
// driver_id: string;
// ad_reg_number: string;
// route_id: string;
// payment_type: string;
// total_cost: string;
// is_paid: boolean;

@Controller('payment')
export class PaymentController {
    constructor(
        private readonly paymentService: PaymentService,
    ) {}

    @Post("insert")
    async addPayment(
        @Body("payment_id") payment_id: string,
        @Body("st_reg_number") st_reg_number: string,
        @Body("driver_id") driver_id: string,
        @Body("ad_reg_number") ad_reg_number: string,
        @Body("route_id") route_id: string,
        @Body("payment_type") payment_type: string,
        @Body("total_cost") total_cost: string,
        @Body("is_paid") is_paid: boolean,
        )
        {
        const generatedId = await this.paymentService.addNewPayment(
            payment_id,
            st_reg_number,
            driver_id,
            ad_reg_number,
            route_id,
            payment_type,
            total_cost,
            is_paid
        );
        return { id: generatedId }
    }

    @Get("get/:st_reg_no")
    async getPaymentRecord(@Param('st_reg_no') st_reg_no) {
        const data = await this.paymentService.getPaymentsByStdRegNumber(st_reg_no);
        return data;
    }

    @Get("get")
    async getAllPaymentRecords() {
        const data = await this.paymentService.getAllRecord();
        return data;
    }
}