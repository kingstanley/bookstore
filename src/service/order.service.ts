// order.service.ts
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { Order } from "src/entity/order.entity";
import { OrderRepository } from "src/repository/order.repository";
import { BookService } from "./book.service";
import { QueueService } from "./queue.service";
import { RabbitMQService } from "./rabbitmq.service";
import { UserService } from "./user.service";

@Injectable()
export class OrderService {
    constructor(
        private orderRepository: OrderRepository,
        private bookService: BookService,
        private userService: UserService,
        private rabbitMQService: RabbitMQService,
        private queueService: QueueService
    ) { }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.getAllOrders();
    }

    async getOrderById(id: number): Promise<Order | null> {
        if (!id) throw new BadRequestException("book id is required");
        const order = await this.orderRepository.getOrderById(id);

        if (!order)
            throw new NotFoundException("order with the supplied id does not exist");
        return order;
    }
    async createOrder(order: Order) {
        const book = await this.bookService.getBookById(order.bookId);
        if (!book) {
            throw new NotFoundException("Book not found");
        }

        const user = await this.userService.getUserById(order.userId);
        if (!user) {
            throw new NotFoundException("User not found");
        }

        // Logic to check if the customer has enough points to purchase the book
        if (user.points < book.point) {
            throw new BadRequestException("Insufficient points");
        }

        // Deduct the points from the customer's balance
        const updatedUser = await this.userService.updateUser(user.id, {
            points: user.points - book.point,
        });

        // Create the order
        const savedOrder = await this.orderRepository.createOrder(order);
        await this.queueService.enqueueOrder(savedOrder);
        return savedOrder;
    }
    processOrder(order: Order) {
        console.log("order to process: ", order);
    }
    // async updateOrder(
    //     id: number,
    //     OrderData: Partial<Order>
    // ): Promise<Order | null> {
    //     return await this.orderRepository.updateOrder(id, OrderData);
    // }
}
