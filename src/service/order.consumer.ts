// order/consumer/order.consumer.ts
import { Injectable } from "@nestjs/common";
import { OrderService } from "./order.service";
import { RabbitMQService } from "./rabbitmq.service";
import { Order } from "src/entity/order.entity";

@Injectable()
export class OrderConsumer {
    constructor(
        private readonly rabbitMQService: RabbitMQService,
        private readonly orderService: OrderService
    ) {
        this.setupConsumer();
    }

    async setupConsumer() {
        await this.rabbitMQService.receiveMessages(
            "order_queue",
            async (message) => {
                try {
                    await this.processOrder(message);
                } catch (error) {
                    console.error("Error processing order:", error);
                }
            }
        );
    }

    async processOrder(order: Order) {
        // console.log("message: ", order);
        try {
            // Process the order using the appropriate method from OrderService
            await this.orderService.processOrder(order);

            // Log or perform any additional actions
            console.log("Order processed successfully:", order);
        } catch (error) {
            // Handle any errors that occurred during order processing
            console.error("Error processing order:", error);
        }
    }
}
