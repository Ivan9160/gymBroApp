import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './workout.dto';
import { WorkoutService } from './workout.service';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';
import { AuthGuard } from '@nestjs/passport';

@Controller('workout')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService){}
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(@Body() dto: CreateWorkoutDto ){
        return this.workoutService.create(dto)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @UsePipes(ParseParamToIntPipe)
    finishWorkout(@Param('id') id: number, @Body() body: UpdateWorkoutDto){
        return this.workoutService.finishWorkout(id, body)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('user/:id')
    findAllByUserId(@Param('id') id: string){
        return this.workoutService.findAllByUserId(+id)
    }

}
