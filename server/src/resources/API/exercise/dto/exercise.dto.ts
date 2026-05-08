import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateExerciseDto{
    @IsString() name!: string;
    @IsNumber() groupId!: number;
    @IsString() video!: string;

    @IsOptional() 
    @IsBoolean() isBodyweight: boolean = false;
}

export type UpdateExerciseDto = Partial<CreateExerciseDto>