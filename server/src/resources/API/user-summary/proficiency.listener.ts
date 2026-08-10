import { Injectable} from '@nestjs/common';
import { ProficiencyService } from '../../businessLogic/proficiency/proficiency.service';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ExerciseGroupService } from '../exercise-group/exerciseGroup.service';
import { WorkoutService } from '../workout/workout.service';
import { UserService } from '../user/user.service';
import { UserSummaryConfig } from './user-summary.config';



@Injectable()
export class ProficiencyListener {
    private readonly logger = new Logger(ProficiencyListener.name);
    constructor(
        private readonly userService: UserService,
        private readonly workoutService: WorkoutService,
        private readonly exerciseGroupService:  ExerciseGroupService,
        private readonly proficiencyService: ProficiencyService,
    ) {}

    @OnEvent('workout.completed', { async: true })
    async handleWorkoutCompletedEvent(payload: {userId: number}) {
        console.log(`[Event received]: Workout.completed for userId: ${payload.userId}`);
        this.logger.log(`[Event received]: Workout.completed for userId: ${payload.userId}`);
        try {
            const user = await this.userService.findById(payload.userId);
            if (!user) {
                this.logger.error(`[User not found]: for userId: ${payload.userId}`);
                return;
            }
            const proficiencySince = new Date();
                proficiencySince.setDate(
                    proficiencySince.getDate() -
                        UserSummaryConfig.PROFICIENCY_DATA_DAYS,
                );
            const workouts = await this.workoutService.findAllByUserId(payload.userId, { since: proficiencySince });
            const exerciseGroups = await this.exerciseGroupService.findAll();
            await this.proficiencyService.calculateAndSaveProficiency(user, workouts, exerciseGroups);
            this.logger.log(`[Proficiency recalculated]: for userId: ${payload.userId}`);
        } catch (error: any) {
            this.logger.error(`[Error recalculating proficiency]: for userId: ${payload.userId}`, error.stack);
        }
    }
}