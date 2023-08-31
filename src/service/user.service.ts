// user.service.ts
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { UserRepository } from "src/repository/user.repository";
import { User } from "../entity/user.entity";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.getAllUsers();
    }

    async getUserById(id: number): Promise<User | null> {
        if (!id) throw new BadRequestException("user id is required");
        const user = await this.userRepository.getUserById(id);
        if (!user)
            throw new NotFoundException(" user with the supplied id does not exist");
        return user;
    }

    async createUser(userData: User): Promise<User> {
        return this.userRepository.createUser(userData);
    }

    async updateUser(id: number, UserData: Partial<User>): Promise<User | null> {
        return await this.userRepository.updateUser(id, UserData);
    }
}
