// order/rabbitmq/rabbitmq.service.ts
import { Injectable } from "@nestjs/common";
import * as amqp from "amqplib";

@Injectable()
export class RabbitMQService {
    private channel: amqp.Channel;

    async setupRabbitMQ() {
        const connection = await amqp.connect(
            "amqps://crfgbfum:pSOrw-b7fgq5nUxrA4JQE6m7xyqmTdw4@sparrow.rmq.cloudamqp.com/crfgbfum"
        ); // Update with your RabbitMQ connection URL
        this.channel = await connection.createChannel();

        const queueName = "order_queue";
        await this.channel.assertQueue(queueName, { durable: false });
    }

    async sendMessage(queueName: string, message: string) {
        if (!this.channel) {
            await this.setupRabbitMQ();
        }

        this.channel.sendToQueue(queueName, Buffer.from(message));
    }

    async receiveMessages(
        queueName: string,
        handleMessage: (message: any) => void
    ) {
        if (!this.channel) {
            await this.setupRabbitMQ();
        }

        this.channel.consume(queueName, (msg) => {
            if (msg) {
                const message = msg.content.toString();
                handleMessage(JSON.parse(message));
                this.channel.ack(msg);
            }
        });
    }
}
