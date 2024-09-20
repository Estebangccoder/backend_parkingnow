import { Injectable, HttpException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";


@Injectable()
export class GetUserIdByEmail{
    constructor(
        private readonly userService: UsersService
    ){}

    async get(email: string): Promise<string> {
        try {
            const user: User = await this.userService.findOneByEmail(email);
            return user.id;
        } catch (error) {
            throw new HttpException(
                error.message || "Error finding userId",
                error.status || 500
              );
        }
    }
}