import { Injectable, NotFoundException } from '@nestjs/common';
import { SorenessConfig } from './soreness.config';
import { ISet, ISoreness, IUser, IUserProfile, IWorkout, IExerciseGroup, IProficiency } from 'src/common/interfaces';
import { CoreMathConfig } from '../coreMath.config';

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
        const excludeAfter = 20 * 3600 * 1000; // Exclude sets that are less than 20 hours old from soreness calculations
        const repeatedBoutMultiplier = this.calculateRepeatedBoutMultiplier(weightedSets, now, excludeAfter);

        weightedSets.forEach(({ set, factor }) => {
            const stress = this.calculateStressForSet(set, proficiency, profile.weight, now, factor, repeatedBoutMultiplier);
            if (stress !== null) {
                totalStress += stress;
            }
        });
        const mrvMultiplier = 1 + (Math.log(1 + proficiency) * 0.5); // Adjust maximal recoverable volume based on proficiency, logarithmic scaling to avoid excessive influence
        const adaptiveLimit = SorenessConfig.SORENESS_LIMIT * mrvMultiplier;
        if (adaptiveLimit === 0) return null;
        return Math.min(100, (totalStress / adaptiveLimit) * 100); 
    }

    private calculateStressForSet(set: ISet, proficiency: number, bodyweight: number, now: number, factor: number, repeatedBoutMultiplier: number): number | null {
        if (!set.exercise.benchmark) {
            return null;
        }

        const divider = set.exercise.benchmark + (set.exercise.isBodyweight ? bodyweight : 0);
        const softFactor = Math.pow(factor, 1 / CoreMathConfig.MUSCLE_FACTOR_SOFTNESS);

        const effectiveWeight = set.exercise.isBodyweight
            ? (bodyweight + set.weight)
            : set.weight;

        const estimated1RM = effectiveWeight * (1 + set.reps / 30);

        const userMaxCapacityForExercise = Math.max(proficiency, 0.2) * divider;
        const groupAdjustedLoad = estimated1RM * softFactor;
        let relativeIntensity =
            groupAdjustedLoad / userMaxCapacityForExercise;

        relativeIntensity = Math.min(1.2, Math.max(0.1, relativeIntensity));

        if (relativeIntensity < SorenessConfig.RELATIVE_INTENSITY_THRESHOLD) {
            return 0;
        }


        const rawDamage =
            Math.pow(set.reps, 0.7) *
            Math.pow(relativeIntensity, CoreMathConfig.INTENSITY_POWER) *
            5
            * softFactor
            *repeatedBoutMultiplier;



        const recoverySpeedup = Math.min(SorenessConfig.MIN_RECOVERY_REDUCTION, proficiency * 0.2);  
        const tauDecay =  (SorenessConfig.RECOVERY_DAYS * 24/4) * (1 - recoverySpeedup); // Decay time constant in hours, adjusted for proficiency
        
        const hoursPassed =
            (now - new Date(set.createdAt).getTime()) / (1000 * 3600);

        const timeFactor = this.biExponentialDamageResponse(hoursPassed, tauDecay);

        return rawDamage * timeFactor;
    }

    private biExponentialDamageResponse(hoursPassed: number, tauDecay: number): number {
        const tauRise = CoreMathConfig.DAMAGE_RISE_HOURS;
        if (hoursPassed < 0) return 0;

        const raw = (t: number) => Math.exp(-t / tauDecay) - Math.exp(-t / tauRise); 
        const tPeak = (tauRise * tauDecay) / (tauDecay - tauRise) * Math.log(tauDecay / tauRise);
        const peakVal = raw(tPeak);

        if (peakVal <= 0) return 0;
        return Math.max(0, raw(hoursPassed) / peakVal);
    }

    private calculateRepeatedBoutMultiplier(groupWeightedSets: IWeightedSet[], now: number, excludeAfter: number): number {
        const lookbackMs = SorenessConfig.REPEATED_BOUT_LOOKBACK_DAYS * 24 * 3600 * 1000;
        const distinctDays = new Set<string>();

        groupWeightedSets.forEach(({ set }) => {
            const age = now - set.createdAt.getTime();
            if (age > excludeAfter && age <= lookbackMs) {
                distinctDays.add(set.createdAt.toISOString().slice(0, 10));
            }
        });

        const sessionCount = distinctDays.size;
        const k = SorenessConfig.REPEATED_BOUT_SATURATION_SESSIONS;
        const adaptationLevel = 1 - Math.exp(-sessionCount / k); 

        const { NOVICE_STRESS_MULTIPLIER: novice, ADAPTED_STRESS_MULTIPLIER: adapted } = SorenessConfig;
        return novice - adaptationLevel * (novice - adapted);
    }
}