import { Body, Controller, Param, Post, Put, UsePipes } from '@nestjs/common';
import { IsDate, IsString } from 'class-validator';
import { CreateWorkoutDto, UpdateWorkoutDto } from './workout.dto';
import { WorkoutService } from './workout.service';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';

@Controller('workout')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService){}
    @Post()
    create(@Body() dto: CreateWorkoutDto ){
        return this.workoutService.create(dto)
    }
    @Put(':id')
    @UsePipes(ParseParamToIntPipe)
    finishWorkout(@Param('id') id: number, @Body() body: UpdateWorkoutDto){
        return this.workoutService.finishWorkout(id, body)
    }

}
