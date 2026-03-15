import { Body, Controller, Delete, Param, Post, UsePipes } from '@nestjs/common';
import { SetService } from './set.service';
import { CreateSetDto } from './set.dto';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';

@Controller('set')
export class SetController {
    constructor(private readonly setService: SetService) { }
    
    @Post()
    create(@Body() dto: CreateSetDto) {
        return this.setService.create(dto)
    }
    
    @UsePipes(ParseParamToIntPipe)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.setService.delete(id);
    }
}
