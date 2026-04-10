import {IsString } from "class-validator"



export class CreateExerciseGroupDto{
    @IsString() name!: string;
}

export type UpdateExerciseGroupDto = Partial<CreateExerciseGroupDto>