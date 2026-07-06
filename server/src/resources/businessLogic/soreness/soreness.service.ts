import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/resources/API/user/user.service';
import { WorkoutService } from 'src/resources/API/workout/workout.service';
import { ExerciseGroupService } from 'src/resources/API/exercise-group/exerciseGroup.service';
import { ProficiencyService } from '../proficiency/proficiency.service';
import { SorenessConfig } from './soreness.config';
import { ISet, ISoreness, IUserProfile } from 'src/common/interfaces';

@Injectable()
export class SorenessService {
    constructor(
        private readonly workoutService: WorkoutService,
        private readonly exerciseGroupService: ExerciseGroupService,
        private readonly userService: UserService,
        private readonly proficiencyService: ProficiencyService
    ) {}
    public async getSorenessForAllMuscleGroups(userId: number): Promise<ISoreness[]> {
        const allGroups = await this.exerciseGroupService.findAll();
        const workouts = await this.workoutService.findAllByUserId(userId);
        const user = await this.userService.findById(userId);

        if (!user || !user.userProfile) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const proficiencies = await this.proficiencyService.getProficiencyForAllMuscleGroups(userId);

        const nowMs = Date.now();
        const recoveryMs = SorenessConfig.RECOVERY_DAYS * 24 * 3600 * 1000;

        const recentSets = workouts.flatMap(w => w.sets).filter(set => {
            const timeDiff = nowMs - new Date(set.createdAt).getTime();
            return timeDiff <= recoveryMs;
        });

        return allGroups.map(group => {
            const groupProficiency = proficiencies.find((p: any) => p.id === group.id)?.proficiency || 0;
            const groupSets = recentSets.filter(s => s.exercise.exerciseGroupId === group.id);
            const sorenessScore = this.calculateSorenessForMuscleGroup(groupSets, groupProficiency, user.userProfile!);

            return { 
                id: group.id, 
                name: group.name, 
                soreness: Math.min(100, sorenessScore || 0) 
            };
        });
    }
    private calculateSorenessForMuscleGroup(sets: ISet[], proficiency: number, profile: IUserProfile): number | null {
        if (sets.length === 0 || proficiency === 0) return 0;
        let totalStress = 0;
        const now = new Date().getTime();
        sets.forEach(set => {
            const stress = this.calculateStressForSet(set, proficiency, profile.weight, now);
            if (stress !== null) {
                totalStress += stress;
            }
        });
        return totalStress / SorenessConfig.SORENESS_LIMIT * 100; 
    }
    private calculateStressForSet(set: ISet, proficiency: number, bodyweight: number, now: number): number | null {
        if (!set.exercise.benchmark) {
            return null; 
        }
        const divider = set.exercise.benchmark! + (set.exercise.isBodyweight ? bodyweight : 0);
        const effectiveWeight = set.exercise.isBodyweight ? (bodyweight + set.weight) : set.weight;

        const estimated1RM = effectiveWeight * (1 + set.reps / 30);
        const safeEffectiveWeight = Math.min(effectiveWeight, estimated1RM * 0.99);
        const userMaxCapacity = proficiency * divider;

        const relativeIntensity = (safeEffectiveWeight * set.exercise.factor) / estimated1RM;

        if (relativeIntensity < 0.3) return 0;

        const maxPossibleReps = 30 * (1 / relativeIntensity - 1);

        const rir = Math.max(0, maxPossibleReps - set.reps);

        const failureProximityFactor = Math.pow(2.718, -0.4 * rir);
        const stress = set.reps * Math.pow(relativeIntensity, 3) * failureProximityFactor * 10;

        const hoursPassed = (now - new Date(set.createdAt).getTime()) / (1000 * 3600);
        const timeFactor = Math.max(0, 1 - hoursPassed / (SorenessConfig.RECOVERY_DAYS * 24));

        return stress*timeFactor;
    }
}
