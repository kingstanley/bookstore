// order/queue/queue.service.ts
import { Injectable } from "@nestjs/common";
import { RabbitMQService } from "./rabbitmq.service";
import { Order } from "src/entity/order.entity";

@Injectable()
export class QueueService {
    constructor(private readonly rabbitMQService: RabbitMQService) { }

    async enqueueOrder(order: Order) {
        await this.rabbitMQService.sendMessage(
            "order_queue",
            JSON.stringify(order)
        );
    }
}
