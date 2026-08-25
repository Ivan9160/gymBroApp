export interface IExercise {
  id: number;
  name: string;
  description: string;
  exerciseGroupId: number;
  isBodyweight: boolean;
  benchmark: number | null;
  factor: number;
}

export interface ISet {
  id: number;
  workoutId: number;
  exerciseId: number;
  muscleGroup: string;
  weight: number;
  reps: number;
  createdAt: string ;
  exercise: IExercise;
}

export interface IWorkout {
  id: number;
  userId: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  finishedAt: Date | null;
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
  accessToken: string;
  name: string;
  role: string; 
  createdAt: Date;
  updatedAt: Date;
  userProfile: IUserProfile | null; 
  workouts?: IWorkout[]; 
}

export interface IExerciseGroup {
  id: number;
  name: string;
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