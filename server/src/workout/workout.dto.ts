import { IsDate, IsNumber } from "class-validator";

export class CreateWorkoutDto{
    @IsDate() date: Date
    @IsNumber() userId: number
}