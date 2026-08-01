import { Injectable, Inject } from '@nestjs/common';
import { ProficiencyService } from './proficiency.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';



@Injectable()
export class ProficiencyListener {
    private readonly logger = new Logger(ProficiencyListener.name);
    constructor(
        private readonly proficiencyService: ProficiencyService
    ) {}

    @OnEvent('workout.completed', { async: true })
    async handleWorkoutCompletedEvent(payload: { userId: number }) {
        console.log(`[Event received]: Workout.completed for userId: ${payload.userId}`);
        const { userId } = payload;
        this.logger.log(`[Event received]: Workout.completed for userId: ${userId}`);
        try {
            await this.proficiencyService.calculateAndSaveProficiency(userId);
            this.logger.log(`[Proficiency recalculated]: for userId: ${userId}`);
        } catch (error: any) {
            this.logger.error(`[Error recalculating proficiency]: for userId: ${userId}`, error.stack);
        }
    }
}