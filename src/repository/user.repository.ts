import { ConflictException, Injectable } from "@nestjs/common";
import { User } from "src/entity/user.entity";
import { PrismaService } from "src/service/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) { }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUserById(id: number): Promise<User | null> {
        console.log('user id: ', id)
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({ where: { email } });
    }
    async createUser(userData: User): Promise<User> {
        console.log("user to save: ", userData);
        try {
            const exist = await this.findByEmail(userData.email);
            if (exist)
                throw new ConflictException("user with the email already exist");
            const saved = await this.prisma.user.create({
                data: userData,
            });
            console.log("saved user: ", saved);
            return saved;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(id: number, UserData: Partial<User>): Promise<User | null> {
        try {
            return this.prisma.user.update({
                where: { id },
                data: UserData,
            });
        } catch (error) {
            throw error;
        }
    }
}
