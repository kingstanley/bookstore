// user.controller.ts
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "src/entity/user.entity";
// import { User } from "@prisma/client";
import { UserService } from "src/service/user.service";

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    async getUserById(@Param("id") id: number) {
        return this.userService.getUserById(+id);
    }
    @Post()
    async createUser(@Body() UserData: User) {
        console.log("calling create user route");
        return this.userService.createUser(UserData);
    }

    @Put(":id")
    async updateUser(@Param("id") id: number, @Body() UserData: Partial<User>) {
        return this.userService.updateUser(+id, UserData);
    }
}
