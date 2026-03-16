import { IsNumber, IsString } from "class-validator"



export class CreateExerciseDto{
    @IsString() name: string;
    @IsNumber() groupId: number;
    @IsString() video: string;
}

export type UpdateExerciseDto = Partial<CreateExerciseDto>