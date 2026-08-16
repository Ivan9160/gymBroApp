import { useMemo, useRef } from "react";
import {
    Animated,
    PanResponder,
    Text,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";

import type { ISet } from "../../../types";
import { styles } from "../../../style";

interface Props {
    set: ISet;
    exerciseName: string | undefined;
    setNumber?: number;
    onDelete: (id: number) => void;
}

export const SwipeableSetItem = ({
    set,
    exerciseName,
    setNumber,
    onDelete,
}: Props) => {
    const { t } = useTranslation();

    const translateX = useRef(
        new Animated.Value(0)
    ).current;

    const panResponder = useMemo(
        () =>
            PanResponder.create({
                onMoveShouldSetPanResponder: (
                    _,
                    gestureState
                ) =>
                    Math.abs(gestureState.dx) > 10 &&
                    Math.abs(gestureState.dx) >
                        Math.abs(gestureState.dy),

                onPanResponderMove: (_, gestureState) => {
                    if (gestureState.dx <= 0) {
                        translateX.setValue(
                            Math.max(
                                gestureState.dx,
                                -200
                            )
                        );
                    }
                },

                onPanResponderRelease: (_, gestureState) => {
                    if (gestureState.dx < -150) {
                        Animated.timing(translateX, {
                            toValue: -500,
                            duration: 200,
                            useNativeDriver: true,
                        }).start(() => {
                            onDelete(set.id!);
                        });

                        return;
                    }

                    Animated.spring(translateX, {
                        toValue: 0,
                        useNativeDriver: true,
                        bounciness: 0,
                    }).start();
                },
            }),
        [onDelete, set.id, translateX]
    );

    return (
        <View style={styles.swipeItem}>
            <View style={styles.swipeDeleteLabel}>
                <Text style={styles.swipeDeleteLabel}>
                    {t("active_workout.swipe_to_delete")}
                </Text>
            </View>

            <Animated.View
                style={[
                    styles.swipeMotion,
                    {
                        transform: [
                            {
                                translateX,
                            },
                        ],
                    },
                ]}
                {...panResponder.panHandlers}
            >
                <View style={styles.swipeCard}>
                    <View style={styles.swipeInfo}>
                        <Text
                            style={styles.swipeTitle}
                            numberOfLines={1}
                        >
                            {t(
                                `database.exercises.${exerciseName}`,
                                {
                                    defaultValue:
                                        exerciseName ?? "",
                                }
                            )}
                        </Text>

                        <Text style={styles.swipeDetails}>
                            {set.weight === 0
                                ? t("set_item.bodyweight")
                                : `${set.weight} ${t(
                                      "workout_details.table.kg"
                                  )}`}{" "}
                            × {set.reps}
                        </Text>
                    </View>

                    <View style={styles.swipeBadge}>
                        <Text style={styles.swipeBadgeText}>
                            {t("set_item.set_label")}{" "}
                            {setNumber}
                        </Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};