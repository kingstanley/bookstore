// book.service.ts
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BookRepository } from "src/repository/book.repository";
import { Book } from "../entity/book.entity";

@Injectable()
export class BookService {
    constructor(private bookRepository: BookRepository) { }

    async getAllBooks(): Promise<Book[]> {
        return this.bookRepository.getAllBooks();
    }

    async getBookById(id: number): Promise<Book | null> {
        if (!id) throw new BadRequestException("book id is required");
        const book = await this.bookRepository.getBookById(id);
        if (!book)
            throw new NotFoundException("book with the supplied id does not exist");
        return book;
    }

    async createBook(bookData: Book): Promise<Book> {
        return await this.bookRepository.createBook(bookData);
    }

    async updateBook(id: number, bookData: Partial<Book>): Promise<Book | null> {
        return await this.bookRepository.updateBook(id, bookData);
    }
}
