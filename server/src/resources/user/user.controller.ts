import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/common/role.enum';
import { CurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User} from 'generated/prisma';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(RolesGuard)
    @Get()
    @Roles(Role.ADMIN)
    findAll() {
        return this.userService.findAll();
    }

    @Get('me')
    getUserByAuth0Id(@CurrentUser() user: User) {
        return user;
    }

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Put('me')
    update(@CurrentUser() user: User, @Body() dto: CreateUserDto) {
        return this.userService.update(user.id, dto);
    }

}
