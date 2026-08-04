import type { IExercise, IExerciseGroup, ISet } from "../../../types";
import { Exercise as RenderedExercise } from "./exercise";
import { useTranslation } from "react-i18next";

interface GroupProps {
    groupIndex: number;
    group: IExerciseGroup;
    groupSets: ISet[];
    currentGroupExercises: IExercise[];
}

export function Group({
    group,
    groupIndex,
    groupSets,
    currentGroupExercises,
}: GroupProps) {
    const { t } = useTranslation();

    return (
        <section className="acct-workout-group">
            <div className="acct-workout-group-header">
                <div className="acct-workout-group-title">
                    <span>{groupIndex + 1}</span>

                    <h2>
                        {t(`database.exercise_groups.${group.name}`, {
                            defaultValue: group.name,
                        })}
                    </h2>
                </div>

                <span className="acct-workout-group-badge">
                    {t("workout_details.sets_label", {
                        count: groupSets.length,
                    })}
                </span>
            </div>

            <div className="acct-workout-group-body">
                {currentGroupExercises.map(
                    (exercise: IExercise, exerciseIndex: number) => {
                        const currentExerciseSets = groupSets.filter(
                            (set: ISet) => set.exerciseId === exercise.id
                        );

                        const exerciseName =
                            currentExerciseSets[0]?.exercise?.name ||
                            exercise.name;

                        return (
                            <RenderedExercise
                                key={exercise.id || exerciseIndex}
                                exerciseIndex={exerciseIndex}
                                exerciseName={exerciseName}
                                currentExerciseSets={currentExerciseSets}
                            />
                        );
                    }
                )}
            </div>
        </section>
    );
}