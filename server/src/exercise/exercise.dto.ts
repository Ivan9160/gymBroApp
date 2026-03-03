import { IsNumber, IsString } from "class-validator"



export class CreateExerciseDto{
    @IsString() name: string;
    @IsString() group: string;
    @IsString() video: string;
}

export type UpdateExerciseDto = Partial<CreateExerciseDto>