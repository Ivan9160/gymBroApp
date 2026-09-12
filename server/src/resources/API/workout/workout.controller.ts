import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, UseGuards, Query, Res} from '@nestjs/common';
import { CreateWorkoutDto, UpdateWorkoutDto } from './dto/workout.dto';
import { WorkoutService } from './workout.service';
import { CurrentUser } from 'src/auth/decorators/get-user.decorator';
import { User} from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WorkoutPaginationDto } from './dto/workout.pagination.dto';
import { Response } from "express";

@Controller('workouts')
@UseGuards(JwtAuthGuard)
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
    async finishWorkout(
        @Param('id', ParseIntPipe) id: number, 
        @Body() body: UpdateWorkoutDto,
        @CurrentUser() user: User
    ){
        return await this.workoutService.finishWorkout(id, user.id, body)
    }

    @Get()
    async findAllByUserId(
        @CurrentUser() user: User,
        @Query() pagination: WorkoutPaginationDto,
        @Res({ passthrough: true }) res: Response,
    ){
        const { workouts, hasNextPage } =
            await this.workoutService.findAllByUserId(
                user.id,
                pagination.page,
                pagination.limit,
            );

        res.setHeader(
            "X-Has-Next-Page",
            String(hasNextPage),
        );

        return workouts;
    }


}
