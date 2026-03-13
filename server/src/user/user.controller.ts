import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':auth0Id')
    getUserByAuth0Id(@Param('auth0Id') auth0Id: string) {
        return this.userService.findByAuth0Id(auth0Id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @UsePipes(ParseParamToIntPipe)
    update(@Param('id') id: number, @Body() dto: CreateUserDto) {
        return this.userService.update(id, dto);
    }

}
