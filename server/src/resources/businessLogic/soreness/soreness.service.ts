import { Injectable, NotFoundException } from '@nestjs/common';
import { SorenessConfig } from './soreness.config';
import { ISet, ISoreness, IUser, IUserProfile, IWorkout, IExerciseGroup, IProficiency } from 'src/common/interfaces';

@Injectable()
export class SorenessService {
    constructor(
    ) {}
    public async getSorenessForAllMuscleGroups(user: IUser, workouts: IWorkout[], exerciseGroups: IExerciseGroup[], proficiencies: IProficiency[]): Promise<ISoreness[]> {
        const sinceDate = new Date();
        sinceDate.setDate(sinceDate.getDate() - SorenessConfig.RECOVERY_DAYS);

        if (!user || !user.userProfile) {
            throw new NotFoundException(`User with ID ${user.id} not found`);
        }


        const recentSets = new Map<number, ISet[]>();
        for (const workout of workouts) {
            for (const set of workout.sets) {
                const groupId = set.exercise.exerciseGroupId;
                if (!recentSets.has(groupId)) {
                    recentSets.set(groupId, []);
                }
                recentSets.get(groupId)?.push(set);
            }
        }

        return exerciseGroups.map(group => {
            const groupProficiency = proficiencies.find((p: any) => p.id === group.id)?.proficiency || 0;
            const groupSets = recentSets.get(group.id) || [];
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
        const adaptiveLimit = SorenessConfig.SORENESS_LIMIT * proficiency;
        if (adaptiveLimit === 0) return null;
        return Math.min(100, (totalStress / adaptiveLimit) * 100); 
    }
    private calculateStressForSet(set: ISet, proficiency: number, bodyweight: number, now: number): number | null {
        if (!set.exercise.benchmark) {
            return null; 
        }
        const divider = set.exercise.benchmark! + (set.exercise.isBodyweight ? bodyweight : 0);
        const effectiveWeight = set.exercise.isBodyweight ? (bodyweight + set.weight) : set.weight;

        const estimated1RM = effectiveWeight * (1 + set.reps / 30);
        const safeEffectiveWeight = Math.min(effectiveWeight, estimated1RM * 0.99);
        const userMaxCapacityForExercise = proficiency * divider;

        let pureIntensity = safeEffectiveWeight / userMaxCapacityForExercise;
        pureIntensity = Math.min(1.0, Math.max(0.1, pureIntensity));

        const maxPossibleReps = 30 * (1 / pureIntensity - 1);

        const rir = Math.max(0, maxPossibleReps - set.reps);

        const relativeIntensityForSet = Math.min(1.0, pureIntensity * set.exercise.factor);
        if (relativeIntensityForSet <0.3) {
            return 0;
        }

        const failureProximityFactor = Math.pow(2.718, -0.4 * rir);
        const stress = set.reps * Math.pow(relativeIntensityForSet, 2) * failureProximityFactor * 10;

        const hoursPassed = (now - new Date(set.createdAt).getTime()) / (1000 * 3600);
        const timeFactor = Math.max(0, 1 - hoursPassed / (SorenessConfig.RECOVERY_DAYS * 24));

        return stress*timeFactor;
    }
}
