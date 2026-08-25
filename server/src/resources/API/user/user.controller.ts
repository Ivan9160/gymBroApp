import {
    Body,
    Controller,
    Get,
    Patch,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { Request } from "express";

import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

interface AuthenticatedRequest extends Request {
    user: { id: number };
}

@Controller("users")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getMe(@Req() req: AuthenticatedRequest) {
        return this.userService.findById(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("me")
    updateMe(
        @Req() req: AuthenticatedRequest,
        @Body() dto: UpdateUserDto
    ) {
        return this.userService.update(req.user.id, dto);
    }
}