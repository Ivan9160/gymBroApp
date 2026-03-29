import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/role.enum';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get()
    @Roles(Role.ADMIN)
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
