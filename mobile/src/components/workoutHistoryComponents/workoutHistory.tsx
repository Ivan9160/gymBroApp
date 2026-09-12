import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
    FlatList
} from "react-native";
import { useTranslation } from "react-i18next";

import { useGetWorkoutsQuery } from "../../api/workoutHistoryApi";
import type { IWorkout } from "../../types";
import { WorkoutHistoryItem } from "./historyItem";
import { router } from "expo-router";
import { useEffect, useState } from "react";

import { styles } from "../../style";

type RootStackParamList = {
    Account: undefined;
    WorkoutHistory: undefined;
    WorkoutDetails: {
        workout: IWorkout;
    };
};



const WorkoutHistory = () => {
    const [page, setPage] = useState(1);
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);

    const {
        data,
        isLoading,
        isFetching,
    } = useGetWorkoutsQuery({
        page,
        limit: 20,
    });

    const pageWorkouts = data?.workouts ?? [];
    useEffect(() => {
        setWorkouts((current) =>
            page === 1
                ? pageWorkouts
                : [...current, ...pageWorkouts]
        );
    }, [pageWorkouts, page]);

    const hasNextPage = pageWorkouts.length === 20 && data?.hasNextPage;

    const loadNextPage = () => {
        if (isFetching || !hasNextPage) {
            return;
        }

        setPage((current) => current + 1);
    };


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
    <FlatList
        data={workouts}
        keyExtractor={(workout, index) => workout.id?.toString() ?? index.toString()}
        renderItem={({ item }) => <WorkoutHistoryItem workout={item} />}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        style={styles.historyList}
        contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
            <View style={styles.formPage}>
                <View style={styles.formContainer}>
                    <View style={styles.formColumn}>
                        <Pressable style={styles.backLink} onPress={() => router.push("/account")}>
                            <Text style={styles.backLinkArrow}>‹</Text>
                            <Text style={styles.backLinkText}>
                                {t("workout_history.back_to_account")}
                            </Text>
                        </Pressable>

                        <View style={[styles.pageHeading, styles.historyHeading]}>
                            <Text style={styles.pageEyebrow}>{t("workout_history.eyebrow")}</Text>
                            <Text style={styles.pageTitle}>{t("workout_history.title")}</Text>
                            <Text style={styles.pageDescription}>
                                {t("workout_history.description")}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        }
        ListEmptyComponent={
            <View style={styles.historyEmpty}>
                <Text style={styles.historyEmptyIcon}>📭</Text>

                <Text style={styles.historyEmptyTitle}>
                    {t("workout_history.empty_title")}
                </Text>

                <Text style={styles.pageDescription}>
                    {t("workout_history.empty_message")}
                </Text>

                <Pressable
                    style={({ pressed }) => [
                        styles.primaryCta,
                        styles.historyEmptyBtn,
                        pressed && styles.primaryCtaDisabled,
                    ]}
                    onPress={() => router.push("/account")}
                >
                    <Text style={styles.primaryCtaText}>
                        {t("workout_history.start_first_workout")}
                    </Text>
                </Pressable>
            </View>
        }
        ListFooterComponent={
            isFetching && page > 1 ? <ActivityIndicator size="small" /> : null
        }
    />
);
};

export default WorkoutHistory;