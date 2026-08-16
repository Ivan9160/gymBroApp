import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { useTranslation } from "react-i18next";

import { useGetWorkoutsQuery } from "../../api/workoutHistoryApi";
import type { IWorkout } from "../../types";
import { WorkoutHistoryItem } from "./historyItem";
import { router } from "expo-router";

import { styles } from "../../style";

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

const WorkoutHistory = () => {
    const navigation = useNavigation<NavigationProp>();

    const {
        data: workoutHistory = [],
        isLoading,
    } = useGetWorkoutsQuery();

    const { t } = useTranslation();

    if (isLoading) {
        return (
            <View style={styles.loadingPage}>
                <View style={styles.loadingCard}>
                    <ActivityIndicator
                        size="small"
                        style={styles.loadingSpinner}
                    />

                    <Text style={styles.loadingText}>
                        {t("workout_history.loading")}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <ScrollView
                    style={styles.accountPage}
                    contentContainerStyle={{
                        paddingVertical: 16,
                        paddingHorizontal: 16,
                    }}
                    showsVerticalScrollIndicator={false}
                >
        <View style={styles.formPage}>
            <View style={styles.formContainer}>
                <View style={styles.formColumn}>
                    <Pressable
                        style={styles.backLink}
                        onPress={() =>
                            router.push("/account")
                        }
                    >
                        <Text style={styles.backLinkArrow}>
                            ‹
                        </Text>

                        <Text style={styles.backLinkText}>
                            {t(
                                "workout_history.back_to_account"
                            )}
                        </Text>
                    </Pressable>

                    <View
                        style={[
                            styles.pageHeading,
                            styles.historyHeading,
                        ]}
                    >
                        <Text style={styles.pageEyebrow}>
                            {t("workout_history.eyebrow")}
                        </Text>

                        <Text style={styles.pageTitle}>
                            {t("workout_history.title")}
                        </Text>

                        <Text style={styles.pageDescription}>
                            {t("workout_history.description")}
                        </Text>
                    </View>

                    {workoutHistory.length === 0 ? (
                        <View style={styles.historyEmpty}>
                            <Text
                                style={
                                    styles.historyEmptyIcon
                                }
                            >
                                📭
                            </Text>

                            <Text
                                style={
                                    styles.historyEmptyTitle
                                }
                            >
                                {t(
                                    "workout_history.empty_title"
                                )}
                            </Text>

                            <Text
                                style={
                                    styles.pageDescription
                                }
                            >
                                {t(
                                    "workout_history.empty_message"
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
                                    router.push("/account")
                                }
                            >
                                <Text
                                    style={
                                        styles.primaryCtaText
                                    }
                                >
                                    {t(
                                        "workout_history.start_first_workout"
                                    )}
                                </Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.historyList}>
                            {workoutHistory.map(
                                (
                                    workout: IWorkout,
                                    index: number
                                ) => (
                                    <WorkoutHistoryItem
                                        key={
                                            workout.id ??
                                            index
                                        }
                                        workout={workout}
                                    />
                                )
                            )}
                        </View>
                    )}
                </View>
            </View>
        </View>
        </ScrollView>
    );
};

export default WorkoutHistory;