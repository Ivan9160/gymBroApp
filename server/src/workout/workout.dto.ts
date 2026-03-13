import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNumber, IsOptional} from "class-validator";

enum WorkoutStatus {
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export class CreateWorkoutDto{
    @IsNumber() userId: number
    @IsOptional() @IsDate() @Type(() => Date) finishedAt?: Date
    @IsEnum(WorkoutStatus) status: WorkoutStatus
}
export type UpdateWorkoutDto = Partial<CreateWorkoutDto>