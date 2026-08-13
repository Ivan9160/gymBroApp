import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";

import { styles } from "../../style/accountStyles";

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
        <View style={styles.workoutExercise}>
            <View style={styles.workoutExerciseTitleRow}>
                <View style={styles.workoutExerciseIndex}>
                    <Text style={styles.workoutExerciseIndexText}>
                        {exerciseIndex + 1}
                    </Text>
                </View>

                <Text style={styles.workoutExerciseTitle}>
                    {t(`database.exercises.${exerciseName}`, {
                        defaultValue:
                            exerciseName ||
                            t("workout_details.unknown_exercise"),
                    })}
                </Text>
            </View>

            <View style={styles.workoutTable}>
                <View style={styles.workoutTableHeader}>
                    <View style={styles.workoutTableCellFirst}>
                        <Text style={styles.workoutTableHeaderText}>
                            {t("workout_details.table.set")}
                        </Text>
                    </View>

                    <View style={styles.workoutTableCellSecond}>
                        <Text style={styles.workoutTableHeaderText}>
                            {t("workout_details.table.weight")}
                        </Text>
                    </View>

                    <View style={styles.workoutTableCellThird}>
                        <Text style={styles.workoutTableHeaderText}>
                            {t("workout_details.table.reps")}
                        </Text>
                    </View>
                </View>

                {currentExerciseSets.map(
                    (set: any, setIndex: number) => {
                        const isLast =
                            setIndex ===
                            currentExerciseSets.length - 1;

                        return (
                            <View
                                key={set.id || setIndex}
                                style={[
                                    styles.workoutTableRow,
                                    isLast &&
                                        styles.workoutTableRowLast,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.workoutTableCell,
                                        styles.workoutTableCellFirst,
                                    ]}
                                >
                                    {setIndex + 1}
                                </Text>

                                <Text
                                    style={[
                                        styles.workoutTableCell,
                                        styles.workoutTableCellSecond,
                                    ]}
                                >
                                    {set.weight ? (
                                        <>
                                            {set.weight}{" "}
                                            <Text
                                                style={
                                                    styles.workoutTableCellSubtext
                                                }
                                            >
                                                {t(
                                                    "workout_details.table.kg"
                                                )}
                                            </Text>
                                        </>
                                    ) : (
                                        t(
                                            "workout_details.table.bodyweight"
                                        )
                                    )}
                                </Text>

                                <Text
                                    style={[
                                        styles.workoutTableCell,
                                        styles.workoutTableCellThird,
                                    ]}
                                >
                                    {set.reps}{" "}
                                    <Text
                                        style={
                                            styles.workoutTableCellSubtext
                                        }
                                    >
                                        {t(
                                            "workout_details.table.reps_unit"
                                        )}
                                    </Text>
                                </Text>
                            </View>
                        );
                    }
                )}
            </View>
        </View>
    );
}