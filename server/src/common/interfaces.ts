export interface IExercise {
  exerciseGroupId: number;
  isBodyweight: boolean;
  benchmark: number | null;
  factor: number;
}

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
  weight: number;
  gender: string;
}

export interface IExerciseGroup {
  id: number;
  name: string;
}