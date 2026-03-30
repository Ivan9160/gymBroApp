import { Body, Controller, Get, Param, Post, Put, UseGuards, UsePipes } from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { WorkoutService } from './workout.service';
import { ParseParamToIntPipe } from 'src/pipes/parseParamToInt';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User} from 'generated/prisma';

@Controller('workout')
export class WorkoutController {
    constructor(private readonly workoutService: WorkoutService){}
    @UseGuards(AuthGuard('jwt'))
    @Post()
    create(
        @Body() dto: CreateWorkoutDto,
        @CurrentUser() user: User
    ){
        return this.workoutService.create(dto, user.id)
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    @UsePipes(ParseParamToIntPipe)
    finishWorkout(@Param('id') id: number, @Body() body: UpdateWorkoutDto){
        return this.workoutService.finishWorkout(id, body)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    findAllByUserId(@CurrentUser() user: User){
        return this.workoutService.findAllByUserId(user.id)
    }

}
