// book.controller.ts
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Book } from "src/entity/book.entity";
// import { Book } from "@prisma/client";
import { BookService } from "src/service/book.service";

@Controller("books")
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    async getAllBooks() {
        return this.bookService.getAllBooks();
    }

    @Get(":id")
    async getBookById(@Param("id") id: number) {
        return this.bookService.getBookById(+id);
    }

    @Post()
    async createBook(@Body() bookData: Book) {
        return this.bookService.createBook(bookData);
    }

    @Put(":id")
    async updateBook(@Param("id") id: number, @Body() bookData: Partial<Book>) {
        return this.bookService.updateBook(id, bookData);
    }
}
