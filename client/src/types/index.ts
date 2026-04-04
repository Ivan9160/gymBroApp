export interface Exercise {
    id: number;
    name: string;
    video: string;
    exerciseGroupId: number;
}
export interface ExerciseGroup {
    id: number;
    name: string;
    exercises?: Exercise[];
}

export interface Set{
    id: number;
    exerciseGroupId: number;
    exerciseId: number;
    reps: number;
    weight: number;
}

export interface Workout {
  id: number;
  createdAt: Date;
  finishedAt: Date;
  sets: {
    id: number;
    weight: number;
    reps: number;
    exercise: {
      id: number;
      name: string;
      exerciseGroup: {
        id: number;
        name: string;
      };
    };
  }[]
};

export interface WorkoutHistory {
    workouts: Workout[];
}