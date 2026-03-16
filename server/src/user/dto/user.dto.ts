import { IsNumber, IsString } from "class-validator"

enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

export class CreateUserDto{
    @IsString() name: string
    @IsString() role: Role
    @IsString() auth0Id: string
    @IsNumber() age: number
    @IsString() gender: string
    @IsNumber() height: number

    weight: number;
    goal: string;

    workoutId: number;
}

export type UpdateUserDto = Partial<CreateUserDto>