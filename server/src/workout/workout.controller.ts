import { Body, Controller, Post } from '@nestjs/common';
import { IsDate, IsString } from 'class-validator';
import { CreateWorkoutDto } from './workout.dto';
import { WorkoutService } from './workout.service';

@Controller('workout')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService){}
    @Post()
    create(@Body() dto: CreateWorkoutDto ){
        return this.workoutService.create(dto)
    }
}
