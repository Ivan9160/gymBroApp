import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSetDto{
    @IsNumber() workoutId: number
    @IsNumber() exerciseId: number
    @IsNumber() weight: number
    @IsNumber() reps: number

    @IsOptional()
    @IsString() notes? : string
}