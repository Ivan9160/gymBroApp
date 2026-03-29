import { Body, Controller, Delete, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { SetService } from './set.service';
import { CreateSetDto } from './dto/set.dto';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

@Controller('set')
export class SetController {
    constructor(private readonly setService: SetService) { }
    
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: CreateSetDto) {
        return this.setService.create(dto)
    }
    
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(ParseParamToIntPipe)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.setService.delete(id);
    }
}
