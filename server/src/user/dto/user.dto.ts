import { IsNumber, IsString } from "class-validator"


export class CreateUserDto{
    @IsString() name: string
    @IsString() auth0Id: string
    @IsNumber() age: number
    @IsString() gender: string
    @IsNumber() height: number

    weight: number;
    goal: string;

    workoutId: number;
}

export type UpdateUserDto = Partial<CreateUserDto>