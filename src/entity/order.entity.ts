// order.entity.ts
import { Prisma } from "@prisma/client";

export class Order implements Prisma.OrderUncheckedCreateInput {
    bookId: number;
    userId: number;
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
