import { Body, Controller, Post } from '@nestjs/common';
import { SetService } from './set.service';
import { CreateSetDto } from './set.dto';

@Controller('set')
export class SetController {
    constructor(private readonly setService: SetService) { }
    
    @Post()
    create(@Body() dto: CreateSetDto) {
        return this.setService.create(dto)
    }
}
