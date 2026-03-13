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
    date: string;
    sets: Set[];
}