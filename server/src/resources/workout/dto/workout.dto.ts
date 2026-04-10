import { Type } from "class-transformer";
import { IsDate, IsEnum,  IsOptional} from "class-validator";
import { WorkoutStatus } from "./workoutStatus.enum";

export class CreateWorkoutDto{
    @IsOptional() @IsDate() @Type(() => Date) finishedAt?: Date
    @IsEnum(WorkoutStatus) status!: WorkoutStatus
}
export type UpdateWorkoutDto = Partial<CreateWorkoutDto>