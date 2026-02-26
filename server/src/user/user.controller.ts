import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { ModifyUserRequestPipe } from './user.modify-request.pipe';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':auth0Id')
    getUserByAuth0Id(@Param('auth0Id') auth0Id: string) {
        return this.userService.findByAuth0Id(auth0Id);
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }
    @Put(':id')
    @UsePipes(ModifyUserRequestPipe)
    update(@Param('id') id: number, @Body() dto: CreateUserDto) {
        return this.userService.update(id, dto);
    }

}
