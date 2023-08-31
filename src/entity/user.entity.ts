// user.entity.ts
import { Prisma } from '@prisma/client';

export class User implements Prisma.UserUncheckedCreateInput {

    username: string;
    email: string;
    points: number;
    id?: number;
}
