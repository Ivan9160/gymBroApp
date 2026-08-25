import { Role } from '@prisma/client';

export interface ISet {
  weight: number;
  reps: number;
  createdAt: Date ;
  exercise: IExercise;
}

export interface IWorkout {
  sets: ISet[];
}

export interface IUserProfile {
  id: number;
  userId: number;
  age: number;
  gender: string;
  height: number;
  weight: number;
  goal: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser {
  id: number;
  name: string;
  role: Role; 
  createdAt: Date;
  updatedAt: Date;
  userProfile: IUserProfile | null; 
  workouts?: IWorkout[]; 
}

export interface IExercise {
  exerciseGroupId: number;
  isBodyweight: boolean;
  benchmark: number | null;
  muscleFactors: IExerciseMuscleFactor[];
}

export interface IExerciseGroup {
  id: number;
  name: string;
}

export interface IExerciseMuscleFactor {
  exerciseId: number;
  exerciseGroupId: number;
  factor: number;
}

export interface IProficiency {
  id: number;
  name: string;
  proficiency: number;
}

export interface ISoreness {
  id: number;
  name: string;
  soreness: number;
}

export interface IWorkoutFilterOptions {
    since?: Date;
}

export interface IUserAccountSummary {
  user: IUser;
  proficiency: IProficiency[];
  soreness: ISoreness[];
}