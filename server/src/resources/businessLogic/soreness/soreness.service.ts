import { Injectable } from '@nestjs/common';
import { UserService } from 'src/resources/API/user/user.service';
import { WorkoutService } from 'src/resources/API/workout/workout.service';
import { ExerciseGroupService } from 'src/resources/API/exercise-group/exerciseGroup.service';
import { ProficiencyService } from '../proficiency/proficiency.service';
import { SorenessConfig } from './soreness.config';
import { ProficiencyConfig } from '../proficiency/proficiency.config';

@Injectable()
export class SorenessService {
    constructor(
        private readonly workoutService: WorkoutService,
        private readonly exerciseGroupService: ExerciseGroupService,
        private readonly userService: UserService,
        private readonly proficiencyService: ProficiencyService
    ) {}
    public async getSorenessForAllMuscleGroups(userId: number): Promise<any> {
        const allGroups = await this.exerciseGroupService.findAll();
        const workouts = await this.workoutService.findAllByUserId(userId);
        const userProfile = await this.userService.findById(userId);

        const proficiencies = await this.proficiencyService.getProficiencyForAllMuscleGroups(userId);
        const now = new Date();

        const nowMs = Date.now();
        const recoveryMs = SorenessConfig.RECOVERY_DAYS * 24 * 3600 * 1000;

        const recentSets = workouts.flatMap(w => w.sets).filter(set => {
            const timeDiff = nowMs - new Date(set.createdAt).getTime();
            return timeDiff <= recoveryMs;
        });

        return allGroups.map(group => {
            const groupProficiency = proficiencies.find(p => p.id === group.id)?.proficiency || 0;
            const groupSets = recentSets.filter(s => s.exercise.exerciseGroupId === group.id);
            const sorenessScore = this.calculateSorenessForMuscleGroup(groupSets, groupProficiency, userProfile);

            return { 
                id: group.id, 
                name: group.name, 
                soreness: Math.min(100, sorenessScore) 
            };
        });
    }
    private calculateSorenessForMuscleGroup(sets: any[], proficiency: number, profile: any): number {
        if (sets.length === 0 || proficiency === 0) return 0;
        let totalStress = 0;
        const now = new Date().getTime();
        sets.forEach(set => {
            totalStress += this.calculateStressForSet(set, proficiency, profile.weight, now);
        });
        return totalStress / SorenessConfig.SORENESS_LIMIT * 100; 
    }
    private calculateStressForSet(set: any, proficiency: number, bodyweight: number, now: number): number {
        const divider = set.exercise.benchmark + (set.exercise.isBodyweight ? bodyweight : 0);
        const effectiveWeight = set.exercise.isBodyweight ? (bodyweight + set.weight) : set.weight;
        const loadFactor = (effectiveWeight * set.exercise.factor / divider);
        const intensity = loadFactor / proficiency;
        const stress = set.reps * Math.pow(intensity, 2);

        const hoursPassed = (now - new Date(set.createdAt).getTime()) / (1000 * 3600);
        const timeFactor = Math.max(0, 1 - hoursPassed / (SorenessConfig.RECOVERY_DAYS * 24));

        return stress*timeFactor;
    }
}
