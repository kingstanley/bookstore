import { Injectable } from "@nestjs/common";
import { Book } from "src/entity/book.entity";
import { PrismaService } from "src/service/prisma.service";

@Injectable()
export class BookRepository {
    constructor(private prisma: PrismaService) { }
    async getAllBooks(): Promise<Book[]> {
        return this.prisma.book.findMany();
    }

    async getBookById(id: number): Promise<Book | null> {
        return this.prisma.book.findUnique({
            where: { id },
        });
    }

    async createBook(bookData: Book): Promise<Book> {
        return this.prisma.book.create({
            data: bookData,
        });
    }

    async updateBook(id: number, bookData: Partial<Book>): Promise<Book | null> {
        return this.prisma.book.update({
            where: { id },
            data: bookData,
        });
    }
}
