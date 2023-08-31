/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from "@nestjs/common";
import { Order } from "src/entity/order.entity";
import { PrismaService } from "src/service/prisma.service";

@Injectable()
export class OrderRepository {
    constructor(private prisma: PrismaService) { }

    async getAllOrders(): Promise<Order[]> {
        return this.prisma.order.findMany();
    }

    async getOrderById(id: number): Promise<Order | null> {
        return this.prisma.order.findUnique({
            where: { id },
        });
    }
    async createOrder(OrderData: Order): Promise<Order> {
        return this.prisma.Order.create({
            data: OrderData,
        });
    }

    async updateOrder(
        id: number,
        OrderData: Partial<Order>
    ): Promise<Order | null> {
        return this.prisma.Order.update({
            where: { id },
            data: OrderData,
        });
    }
}
