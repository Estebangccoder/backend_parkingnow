import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "src/users/entities/user.entity";


@Injectable()
export class GetUserIdByEmail{
    constructor(
        private readonly userService: UsersService
    ){}

    async getUserId(email: string): Promise<string> {
        const user: User = await this.userService.findOneByEmail(email);
        return user.id;
    }
}