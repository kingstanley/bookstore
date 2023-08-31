
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BookController } from "./controller/book.controller";
import { OrderController } from "./controller/order.controller";
import { UserController } from "./controller/user.controller";
import { UserRepository } from "./repository/user.repository";
import { BookService } from "./service/book.service";
import { OrderService } from "./service/order.service";
import { PrismaService } from "./service/prisma.service";
import { UserService } from "./service/user.service";
import { BookRepository } from "./repository/book.repository";
import { OrderRepository } from "./repository/order.repository";
import { RabbitMQService } from "./service/rabbitmq.service";
import { QueueService } from "./service/queue.service";
import { OrderConsumer } from "./service/order.consumer";

@Module({
  imports: [],
  controllers: [UserController, OrderController, BookController, AppController],
  providers: [
    RabbitMQService,
    OrderService,
    OrderRepository,
    UserService,
    OrderService,
    BookService,
    PrismaService,
    UserRepository,
    BookRepository,
    QueueService,
    OrderConsumer,
    AppService,
  ],
})
export class AppModule { }
