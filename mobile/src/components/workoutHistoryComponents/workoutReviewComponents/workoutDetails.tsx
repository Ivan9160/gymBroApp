import {
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import {
    useNavigation,
} from "@react-navigation/native";
import type {
    NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";

import type {
    IExerciseGroup,
    ISet,
    IWorkout,
} from "../../../types";

import {
    useGetExerciseGroupsQuery,
    useGetExercisesQuery,
} from "../../../api/exerciseApi";

import { Group } from "./group";

import {
    styles,
    getGuestContainerStyle
} from "../../style/accountStyles";

type RootStackParamList = {
    Account: undefined;
    WorkoutHistory: undefined;
    WorkoutDetails: {
        workout: IWorkout;
    };
};
import { useLocalSearchParams } from "expo-router";

type NavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

type WorkoutDetailsProps = {
    route: {
        params?: {
            workout?: IWorkout;
        };
    };
};

function WorkoutDetails({
}: WorkoutDetailsProps) {
    const navigation =
        useNavigation<NavigationProp>();

    const { workout: workoutString } =
    useLocalSearchParams<{
        workout?: string;
    }>();

const workout = workoutString
    ? JSON.parse(workoutString)
    : undefined;


    const {
        data: exercises = [],
    } = useGetExercisesQuery();

    const {
        data: exerciseGroups = [],
    } = useGetExerciseGroupsQuery();

    const { t, i18n } =
        useTranslation();

    const locale =
        i18n.language
            ?.toLowerCase()
            .startsWith("uk")
            ? "uk-UA"
            : "en-US";

    if (!workout) {
        return (
            
            <View style={styles.contentPage}>
                <View style={styles.contentContainer}>
                    <View style={styles.historyEmpty}>
                        <Text
                            style={
                                styles.historyEmptyIcon
                            }
                        >
                            🗂️
                        </Text>

                        <Text
                            style={
                                styles.historyEmptyTitle
                            }
                        >
                            {t(
                                "workout_details.not_found_title"
                            )}
                        </Text>

                        <Text
                            style={
                                styles.historyEmptyText
                            }
                        >
                            {t(
                                "workout_details.not_found_message"
                            )}
                        </Text>

                        <Pressable
                            style={({ pressed }) => [
                                styles.primaryCta,
                                styles.historyEmptyBtn,
                                pressed &&
                                    styles.primaryCtaDisabled,
                            ]}
                            onPress={() =>
                                navigation.navigate(
                                    "WorkoutHistory"
                                )
                            }
                        >
                            <Text
                                style={
                                    styles.primaryCtaText
                                }
                            >
                                {t(
                                    "workout_details.back_to_history"
                                )}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        );
    }

    const currentWorkoutGroups =
        exerciseGroups.filter((group) =>
            workout.sets.some(
                (set: ISet) =>
                    exercises.find(
                        (ex) =>
                            ex.id ===
                            set.exerciseId
                    )?.exerciseGroupId ===
                    group.id
            )
        );

    const currentWorkoutExercises =
        exercises.filter((exercise) =>
            workout.sets.some(
                (set: ISet) =>
                    set.exerciseId ===
                    exercise.id
            )
        );

    const uniqueExerciseCount =
        new Set(
            workout.sets.map(
                (set: ISet) =>
                    set.exerciseId
            )
        ).size;

    const formatTime = (
        startDate: Date,
        endDate: Date
    ) => {
        const totalSeconds = Math.max(
            0,
            Math.floor(
                (endDate.getTime() -
                    startDate.getTime()) /
                    1000
            )
        );

        const hours = Math.floor(
            totalSeconds / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const seconds =
            totalSeconds % 60;

        return [
            hours,
            minutes,
            seconds,
        ]
            .map((value) =>
                value
                    .toString()
                    .padStart(2, "0")
            )
            .join(":");
    };

    const formatDate = (
        dateString: string
    ) =>
        new Date(
            dateString
        ).toLocaleDateString(
            locale,
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    return (
        <ScrollView
                style={styles.accountPage}
                contentContainerStyle={{
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                }}
                showsVerticalScrollIndicator={false}
            >
        <View style={styles.contentPage}>
            <View style={styles.contentContainer}>
                <Pressable
                    style={styles.backLink}
                    onPress={() =>
                        navigation.navigate(
                            "WorkoutHistory"
                        )
                    }
                >
                    <Text
                        style={
                            styles.backLinkArrow
                        }
                    >
                        ‹
                    </Text>

                    <Text
                        style={
                            styles.backLinkText
                        }
                    >
                        {t(
                            "workout_details.back_to_history"
                        )}
                    </Text>
                </Pressable>

                <View
                    style={
                        styles.detailsCard
                    }
                >
                    <View
                        style={
                            styles.detailsHero
                        }
                    >
                        <View
                            style={
                                styles.detailsHeroContent
                            }
                        >
                            <Text
                                style={
                                    styles.pageEyebrow
                                }
                            >
                                {t(
                                    "workout_details.eyebrow"
                                )}
                            </Text>

                            <Text
                                style={
                                    styles.detailsHeroTitle
                                }
                            >
                                {t(
                                    "workout_details.default_name"
                                )}
                            </Text>

                            <View
                                style={
                                    styles.detailsDate
                                }
                            >
                                <Text
                                    style={
                                        styles.detailsDateIcon
                                    }
                                >
                                    ◷
                                </Text>

                                <Text>
                                    {formatDate(
                                        workout.createdAt.toString()
                                    )}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={
                                styles.detailsStatus
                            }
                        >
                            <Text
                                style={
                                    styles.detailsStatusText
                                }
                            >
                                {t(
                                    "workout_details.status_completed"
                                )}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={[
                            styles.detailsStats,
                            styles.detailsStatsTwo,
                        ]}
                    >
                        <View
                            style={
                                styles.detailsStat
                            }
                        >
                            <View
                                style={
                                    styles.detailsStatLabel
                                }
                            >
                                <Text
                                    style={
                                        styles.detailsStatIcon
                                    }
                                >
                                    ◷
                                </Text>

                                <Text>
                                    {t(
                                        "workout_details.duration"
                                    )}
                                </Text>
                            </View>

                            <Text
                                style={
                                    styles.detailsStatValue
                                }
                            >
                                {formatTime(
                                    new Date(
                                        workout.createdAt
                                    ),
                                    new Date(
                                        workout.finishedAt ||
                                            workout.createdAt
                                    )
                                )}
                            </Text>
                        </View>

                        <View
                            style={[
                                styles.detailsStat,
                                styles.detailsStatLast,
                            ]}
                        >
                            <View
                                style={
                                    styles.detailsStatLabel
                                }
                            >
                                <Text
                                    style={
                                        styles.detailsStatIcon
                                    }
                                >
                                    ●
                                </Text>

                                <Text>
                                    {t(
                                        "workout_details.exercises_count"
                                    )}
                                </Text>
                            </View>

                            <Text
                                style={
                                    styles.detailsStatValue
                                }
                            >
                                {uniqueExerciseCount}
                            </Text>
                        </View>
                    </View>

                    <View
                        style={
                            styles.detailsBody
                        }
                    >
                        <View
                            style={
                                styles.detailsSectionHeading
                            }
                        >
                            <Text
                                style={[
                                    styles.sectionLabel,
                                    styles.detailsSectionLabel,
                                ]}
                            >
                                {t(
                                    "workout_details.summary_title"
                                )}
                            </Text>

                            <Text
                                style={
                                    styles.detailsSectionCount
                                }
                            >
                                {t(
                                    "workout_details.sets_total",
                                    {
                                        count:
                                            workout
                                                .sets
                                                .length,
                                    }
                                )}
                            </Text>
                        </View>

                        <View
                            style={
                                styles.detailsGroups
                            }
                        >
                            {currentWorkoutGroups.map(
                                (
                                    group: IExerciseGroup,
                                    groupIndex: number
                                ) => {
                                    const currentGroupExercises =
                                        currentWorkoutExercises.filter(
                                            (
                                                exercise
                                            ) =>
                                                exercise.exerciseGroupId ===
                                                group.id
                                        );

                                    const groupSets =
                                        workout.sets.filter(
                                            (
                                                set: ISet
                                            ) =>
                                                currentGroupExercises.some(
                                                    (
                                                        exercise
                                                    ) =>
                                                        exercise.id ===
                                                        set.exerciseId
                                                )
                                        );

                                    return (
                                        <Group
                                            key={
                                                group.id
                                            }
                                            group={
                                                group
                                            }
                                            groupIndex={
                                                groupIndex
                                            }
                                            groupSets={
                                                groupSets
                                            }
                                            currentGroupExercises={
                                                currentGroupExercises
                                            }
                                        />
                                    );
                                }
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
    );
}

export default WorkoutDetails;