// order.controller.ts
import { Body, Controller, Get, Param, Post } from "@nestjs/common";
// import { Order } from "@prisma/client";
import { OrderService } from "../service/order.service";
import { Order } from "src/entity/order.entity";

@Controller("orders")
export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get()
    async getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Get(":id")
    async getOrderById(@Param("id") id: number) {
        return this.orderService.getOrderById(+id);
    }

    @Post("")
    async createOrder(@Body() OrderData: Order) {
        return this.orderService.createOrder(OrderData);
    }

    // @Put(":id")
    // async updateOrder(
    //     @Param("id") id: number,
    //     @Body() OrderData: Partial<Order>
    // ) {
    //     return this.orderService.updateOrder(id, OrderData);
    // }
}
