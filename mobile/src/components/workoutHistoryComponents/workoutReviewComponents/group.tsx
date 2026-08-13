import type {
    IExercise,
    IExerciseGroup,
    ISet,
} from "../../../types";
import { Exercise as RenderedExercise } from "./exercise";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

import { styles } from "../../style/accountStyles";

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
        <View style={styles.workoutGroup}>
            <View style={styles.workoutGroupHeader}>
                <View style={styles.workoutGroupTitle}>
                    <View style={styles.workoutGroupTitleIcon}>
                        <Text style={styles.workoutGroupTitleIconText}>
                            {groupIndex + 1}
                        </Text>
                    </View>

                    <Text style={styles.workoutGroupTitleText}>
                        {t(`database.exercise_groups.${group.name}`, {
                            defaultValue: group.name,
                        })}
                    </Text>
                </View>

                <View style={styles.workoutGroupBadge}>
                    <Text style={styles.workoutGroupBadgeText}>
                        {t("workout_details.sets_label", {
                            count: groupSets.length,
                        })}
                    </Text>
                </View>
            </View>

            <View style={styles.workoutGroupBody}>
                {currentGroupExercises.map(
                    (exercise: IExercise, exerciseIndex: number) => {
                        const currentExerciseSets = groupSets.filter(
                            (set: ISet) =>
                                set.exerciseId === exercise.id
                        );

                        const exerciseName =
                            currentExerciseSets[0]?.exercise?.name ||
                            exercise.name;

                        return (
                            <RenderedExercise
                                key={exercise.id || exerciseIndex}
                                exerciseIndex={exerciseIndex}
                                exerciseName={exerciseName}
                                currentExerciseSets={
                                    currentExerciseSets
                                }
                            />
                        );
                    }
                )}
            </View>
        </View>
    );
}