import { Injectable, NotFoundException } from '@nestjs/common';
import { SorenessConfig } from './soreness.config';
import { ISet, ISoreness, IUser, IUserProfile, IWorkout, IExerciseGroup, IProficiency } from 'src/common/interfaces';

interface IWeightedSet {
  set: ISet;
  factor: number; 
}

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

        const recentSets = this.buildSetsByGroup(workouts);

        return exerciseGroups.map(group => {
            const groupProficiency = proficiencies.find((p: any) => p.id === group.id)?.proficiency || 0;
            const groupWeightedSets = recentSets.get(group.id) || [];
            const sorenessScore = this.calculateSorenessForMuscleGroup(groupWeightedSets, groupProficiency, user.userProfile!);

            return { 
                id: group.id, 
                name: group.name, 
                soreness: Math.min(100, sorenessScore || 0) 
            };
        });
    }

    private buildSetsByGroup(workouts: IWorkout[]): Map<number, IWeightedSet[]> {
        const setsByGroup = new Map<number, IWeightedSet[]>();

        for (const workout of workouts) {
            for (const set of workout.sets) {
                for (const muscleFactor of set.exercise.muscleFactors) {
                    const groupId = muscleFactor.exerciseGroupId;
                    if (!setsByGroup.has(groupId)) {
                        setsByGroup.set(groupId, []);
                    }
                    setsByGroup.get(groupId)!.push({ set, factor: muscleFactor.factor });
                }
            }
        }

        return setsByGroup;
    }

    private calculateSorenessForMuscleGroup(weightedSets: IWeightedSet[], proficiency: number, profile: IUserProfile): number | null {
        if (weightedSets.length === 0 || proficiency === 0) return 0;
        let totalStress = 0;
        const now = new Date().getTime();
        weightedSets.forEach(({ set, factor }) => {
            const stress = this.calculateStressForSet(set, proficiency, profile.weight, now, factor);
            if (stress !== null) {
                totalStress += stress;
            }
        });
        const adaptiveLimit = SorenessConfig.SORENESS_LIMIT 
        if (adaptiveLimit === 0) return null;
        return Math.min(100, (totalStress / adaptiveLimit) * 100); 
    }

    private calculateStressForSet(set: ISet, proficiency: number, bodyweight: number, now: number, factor: number): number | null {
        if (!set.exercise.benchmark) {
            return null;
        }

        const divider = set.exercise.benchmark + (set.exercise.isBodyweight ? bodyweight : 0);

        const effectiveWeight = set.exercise.isBodyweight
            ? (bodyweight + set.weight)
            : set.weight;

        const estimated1RM = effectiveWeight * (1 + set.reps / 30);

        const userMaxCapacityForExercise = proficiency * divider;

        let relativeIntensity =
            estimated1RM / userMaxCapacityForExercise;

        relativeIntensity = Math.min(1.2, Math.max(0.1, relativeIntensity));

        if (relativeIntensity < 0.2) {
            return 0;
        }

        const stress =
            Math.pow(set.reps, 0.7) *
            Math.pow(relativeIntensity, 2.5) *
            5
            * factor;

        const hoursPassed =
            (now - new Date(set.createdAt).getTime()) / (1000 * 3600);

        const timeFactor = Math.max(
            0,
            1 - hoursPassed / (SorenessConfig.RECOVERY_DAYS * 24)
        );

        return stress * timeFactor;
    }
}