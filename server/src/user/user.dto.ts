import { IsNumber, IsString } from "class-validator"

export class CreateUserDto{
    @IsString() name: string
    @IsString() email: string
    @IsString() auth0Id: string
    @IsNumber() age: number
    @IsString() gender: string
    @IsNumber() height: number

    weight: number;
    fatPercentage: number;
    goal: string;

    workoutId: number;
}

export type TUpdateUserDto = Partial<CreateUserDto>