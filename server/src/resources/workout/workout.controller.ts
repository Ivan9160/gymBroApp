import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { WorkoutService } from './workout.service';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User} from 'generated/prisma';

@Controller('workouts')
@UseGuards(AuthGuard('jwt'))
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService){}
    
    @Post()
    create(
        @Body() dto: CreateWorkoutDto,
        @CurrentUser() user: User
    ){
        return this.workoutService.create(dto, user.id)
    }

    @Put(':id')
    finishWorkout(
        @Param('id', ParseIntPipe) id: number, 
        @Body() body: UpdateWorkoutDto,
        @CurrentUser() user: User
    ){
        return this.workoutService.finishWorkout(id, user.id, body)
    }

    @Get()
    findAllByUserId(@CurrentUser() user: User){
        return this.workoutService.findAllByUserId(user.id)
    }

}
