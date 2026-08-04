import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";

interface ExerciseProps {
    exerciseIndex: number;
    exerciseName?: string;
    currentExerciseSets: any[];
}

export function Exercise({
    exerciseIndex,
    exerciseName,
    currentExerciseSets,
}: ExerciseProps) {
    const { t } = useTranslation();

    return (
        <div className="acct-workout-exercise">
            <div className="acct-workout-exercise-title-row">
                <span>{exerciseIndex + 1}</span>

                <h3>
                    {t(`database.exercises.${exerciseName}`, {
                        defaultValue:
                            exerciseName ||
                            t("workout_details.unknown_exercise"),
                    })}
                </h3>
            </div>

            <Table
                responsive
                borderless
                className="acct-workout-table mb-0"
            >
                <thead>
                    <tr>
                        <th>{t("workout_details.table.set")}</th>
                        <th>{t("workout_details.table.weight")}</th>
                        <th>{t("workout_details.table.reps")}</th>
                    </tr>
                </thead>

                <tbody>
                    {currentExerciseSets.map(
                        (set: any, setIndex: number) => (
                            <tr key={set.id || setIndex}>
                                <td>{setIndex + 1}</td>

                                <td>
                                    {set.weight ? (
                                        <>
                                            {set.weight}{" "}
                                            <span>
                                                {t(
                                                    "workout_details.table.kg"
                                                )}
                                            </span>
                                        </>
                                    ) : (
                                        t("workout_details.table.bodyweight")
                                    )}
                                </td>

                                <td>
                                    {set.reps}{" "}
                                    <span>
                                        {t(
                                            "workout_details.table.reps_unit"
                                        )}
                                    </span>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </div>
    );
}