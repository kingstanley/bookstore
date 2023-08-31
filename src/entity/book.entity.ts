// book.entity.ts
import { Prisma } from '@prisma/client';

export class Book implements Prisma.BookUncheckedCreateInput {

    title: string;
    writer: string;
    coverUrl: string;
    point: number;
    tags: string[];
    id?: number;
}
