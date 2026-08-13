import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    Pressable,
    Text,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";

import type { IWorkout } from "../../types";
import { styles } from "../style/accountStyles";
import { router } from "expo-router";

type RootStackParamList = {
    Account: undefined;
    WorkoutHistory: undefined;
    WorkoutDetails: {
        workout: IWorkout;
    };
};

type NavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "WorkoutHistory"
>;

interface WorkoutHistoryItemProps {
    workout: IWorkout;
}

export const WorkoutHistoryItem = ({
    workout,
}: WorkoutHistoryItemProps) => {
    const navigation = useNavigation<NavigationProp>();
    const { t, i18n } = useTranslation();

    const locale = i18n.language
        ?.toLowerCase()
        .startsWith("uk")
        ? "uk"
        : "en";

    const formatDuration = (
        startDateFromServer: string,
        endDateFromServer?: string
    ) => {
        const startDate = new Date(startDateFromServer);

        const endDate = endDateFromServer
            ? new Date(endDateFromServer)
            : startDate;

        const totalMinutes = Math.max(
            0,
            Math.round(
                (endDate.getTime() -
                    startDate.getTime()) /
                    60000
            )
        );

        const hours = Math.floor(
            totalMinutes / 60
        );

        const minutes = totalMinutes % 60;

        return [
            hours > 0
                ? `${hours} ${t(
                      "workout_history.hours"
                  )}`
                : "",
            minutes > 0 || hours === 0
                ? `${minutes} ${t(
                      "workout_history.minutes"
                  )}`
                : "",
        ]
            .filter(Boolean)
            .join(" ");
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString(
            locale,
            {
                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

    const formatTime = (dateString: string) =>
        new Date(dateString).toLocaleTimeString(
            locale,
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );

    return (
        <View style={styles.historyCard}>
            {/* Header */}
            <View style={styles.historyCardHeader}>
                <View
                    style={
                        styles.historyCardHeaderContent
                    }
                >
                    <Text
                        style={
                            styles.historyCardEyebrow
                        }
                    >
                        {t(
                            "workout_history.completed"
                        )}
                    </Text>

                    <View
                        style={
                            styles.historyCardDate
                        }
                    >
                        <Text>
                            {formatDate(
                                workout.createdAt.toString()
                            )}
                        </Text>

                        <Text>·</Text>

                        <Text>
                            {t(
                                "workout_history.at"
                            )}{" "}
                            {formatTime(
                                workout.createdAt.toString()
                            )}
                        </Text>
                    </View>
                </View>

                <View
                    style={
                        styles.historyBadge
                    }
                >
                    <Text
                        style={
                            styles.historyBadgeText
                        }
                    >
                        {t(
                            "workout_history.sets_count",
                            {
                                count:
                                    workout.sets
                                        .length,
                            }
                        )}
                    </Text>
                </View>
            </View>

            {/* Sets */}
            <View style={styles.historySetList}>
                {workout.sets.length > 0 ? (
                    workout.sets
                        .slice(0, 3)
                        .map(
                            (
                                set: any,
                                index: number
                            ) => (
                                <View
                                    key={
                                        set.id ??
                                        index
                                    }
                                    style={[
                                        styles.historySetRow,
                                        index ===
                                            Math.min(
                                                workout
                                                    .sets
                                                    .length,
                                                3
                                            ) -
                                                1 &&
                                            styles.historySetRowLast,
                                    ]}
                                >
                                    <View
                                        style={
                                            styles.historySetMain
                                        }
                                    >
                                        <View
                                            style={
                                                styles.historySetIndex
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.historySetIndexText
                                                }
                                            >
                                                {index +
                                                    1}
                                            </Text>
                                        </View>

                                        <View
                                            style={
                                                styles.historySetMainContent
                                            }
                                        >
                                            <Text
                                                style={
                                                    styles.historySetMainTitle
                                                }
                                            >
                                                {t(
                                                    `database.exercises.${set.exercise?.name}`,
                                                    {
                                                        defaultValue:
                                                            set
                                                                .exercise
                                                                ?.name ||
                                                            "—",
                                                    }
                                                )}
                                            </Text>

                                            <Text
                                                style={
                                                    styles.historySetMainSubtitle
                                                }
                                            >
                                                {t(
                                                    "workout_history.set_number",
                                                    {
                                                        number:
                                                            index +
                                                            1,
                                                    }
                                                )}
                                            </Text>
                                        </View>
                                    </View>

                                    <Text
                                        style={
                                            styles.historySetValue
                                        }
                                    >
                                        {set.weight >
                                        0
                                            ? `${set.weight} ${t(
                                                  "workout_history.kg"
                                              )} × ${
                                                  set.reps
                                              }`
                                            : `${t(
                                                  "workout_history.bodyweight"
                                              )} × ${
                                                  set.reps
                                              }`}
                                    </Text>
                                </View>
                            )
                        )
                ) : (
                    <Text
                        style={
                            styles.historyEmptyInline
                        }
                    >
                        {t(
                            "workout_history.empty"
                        )}
                    </Text>
                )}
            </View>

            {/* More sets */}
            {workout.sets.length > 3 && (
                <Text
                    style={
                        styles.historyMore
                    }
                >
                    {t(
                        "workout_history.more",
                        {
                            count:
                                workout.sets
                                    .length - 3,
                        }
                    )}
                </Text>
            )}

            {/* Footer */}
            <View
                style={
                    styles.historyCardFooter
                }
            >
                <View
                    style={
                        styles.historyDuration
                    }
                >
                    <Text
                        style={
                            styles.historyDurationLabel
                        }
                    >
                        {t(
                            "workout_history.duration"
                        )}
                    </Text>

                    <Text
                        style={
                            styles.historyDurationValue
                        }
                    >
                        {formatDuration(
                            workout.createdAt.toString(),
                            workout.finishedAt?.toString()
                        )}
                    </Text>
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.ghostButton,
                        styles.historyReviewBtn,
                        pressed &&
                            styles.choiceBtnPressed,
                    ]}
                    onPress={() =>
                        router.push({
                            pathname: "/history/review",
                            params: {
                                workout: JSON.stringify(workout),
                            },
                        })
                    }
                >
                    <Text
                        style={
                            styles.ghostButtonText
                        }
                    >
                        {t(
                            "workout_history.view_detailed"
                        )}
                    </Text>

                    <Text
                        style={
                            styles.ghostButtonText
                        }
                    >
                        ›
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};