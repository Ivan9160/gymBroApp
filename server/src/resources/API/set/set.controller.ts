import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards} from '@nestjs/common';
import { SetService } from './set.service';
import { CreateSetDto } from './dto/set.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'generated/prisma/wasm';

@Controller('sets')
@UseGuards(AuthGuard('jwt'))
export class SetController {
    constructor(private readonly setService: SetService) { }
    
    @Post()
    create(
        @Body() dto: CreateSetDto,
        @CurrentUser() user: User
    ) {
        return this.setService.create(dto, user.id);
    }
    
    @Delete(':id')
    delete(
        @Param('id', ParseIntPipe) id: number,
        @CurrentUser() user: User
    ) {
        return this.setService.delete(id, user.id);
    }
}
