import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    Pressable,
    Text,
    View,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useGetExercisesQuery } from "../../api/exerciseApi";
import {
    setWorkoutId,
    setWorkoutStartTime,
} from "../../store/slices/workoutSlice";
import ActiveWorkout from "./activeWorkoutComponents/activeWorkout";
import MuscleBodyMap from "./sorenessDiagram";
import ProficiencyLevelsList from "./proficiencyLevels";
import {
    colors,
    styles,
} from "../style/accountStyles";
import { useGetUserSummaryQuery } from "../../api/userApi";
import {useEffect} from "react";

function getSorenessColor(
    value: number
): string {
    const clampedValue = Math.min(
        Math.max(value, 0),
        100
    );

    if (clampedValue <= 50) {
        const percentage = clampedValue / 50;

        const start = hexToRgb(colors.acctFresh);
        const end = hexToRgb(colors.acctModerate);

        return interpolateColor(
            start,
            end,
            percentage
        );
    }

    const percentage =
        (clampedValue - 50) / 50;

    const start = hexToRgb(colors.acctModerate);
    const end = hexToRgb(colors.acctSore);

    return interpolateColor(
        start,
        end,
        percentage
    );
}

function hexToRgb(
    hex: string
): [number, number, number] {
    const normalized = hex.replace("#", "");

    const value =
        normalized.length === 3
            ? normalized
                  .split("")
                  .map((char) => char + char)
                  .join("")
            : normalized;

    return [
        parseInt(value.slice(0, 2), 16),
        parseInt(value.slice(2, 4), 16),
        parseInt(value.slice(4, 6), 16),
    ];
}

function interpolateColor(
    start: [number, number, number],
    end: [number, number, number],
    amount: number
): string {
    const r = Math.round(
        start[0] +
            (end[0] - start[0]) * amount
    );

    const g = Math.round(
        start[1] +
            (end[1] - start[1]) * amount
    );

    const b = Math.round(
        start[2] +
            (end[2] - start[2]) * amount
    );

    return `rgb(${r}, ${g}, ${b})`;
}

type DebugGlobal = typeof globalThis & {
  showStorage: () => Promise<void>;
};

const debugGlobal = globalThis as DebugGlobal;

debugGlobal.showStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    console.log("🔑 KEYS:", keys);

    const result: Record<string, string | null> = {};

    for (const key of keys) {
      result[key] = await AsyncStorage.getItem(key);
    }

    console.log("📦 STORAGE:", result);
  } catch (error) {
    console.error("❌ AsyncStorage error:", error);
  }
};

function Account() {
    let user = useSelector(
        (state: any) => state.user
    );

    const workout = useSelector(
        (state: any) => state.workout
    );

    const dispatch = useDispatch();
    const { t } = useTranslation();

    

    useGetExercisesQuery();
    const {
        data: userSummary,
        isLoading: userSummaryLoading,
        isFetching: userSummaryFetching,
        isSuccess: userSummarySuccess,
        isError: userSummaryIsError,
        error: userSummaryError,
    } = useGetUserSummaryQuery();

     user = userSummary?.user ?? user;

    const proficiencyGroups =
        userSummary?.proficiency ??
        user?.proficiency ??
        [];

    const sorenessData =
        userSummary?.soreness ??
        user?.soreness ??
        [];

    useEffect(() => {
        console.log("=== USER SUMMARY ===");
        console.log("loading:", userSummaryLoading);
        console.log("fetching:", userSummaryFetching);
        console.log("success:", userSummarySuccess);
        console.log("error:", userSummaryIsError);
        console.log("data:", userSummary);
        console.log("error data:", userSummaryError);
    }, [
        userSummaryLoading,
        userSummaryFetching,
        userSummarySuccess,
        userSummaryIsError,
        userSummary,
        userSummaryError,
    ]);

    const startWorkout = async () => {
        const token = await AsyncStorage.getItem("token");

        axios
            .post(
                `${process.env.EXPO_PUBLIC_API_URL}/workouts`,
                {
                    date: new Date().toISOString(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                const createdWorkout =
                    response.data;

                dispatch(
                    setWorkoutId(
                        createdWorkout.id
                    )
                );

                dispatch(
                    setWorkoutStartTime(
                        createdWorkout.createdAt
                    )
                );
            })
            .catch((error) => {
                console.error(
                    "Error starting workout:",
                    error
                );
            });
    };

    const initials = user?.name
        ? user.name
              .charAt(0)
              .toUpperCase()
        : "?";


    if (
        userSummaryLoading ||
        userSummaryFetching
    ) {
        return (
            <View style={styles.loadingPage}>
                <View style={styles.loadingCard}>
                    <ActivityIndicator
                        size="small"
                        style={styles.loadingSpinner}
                    />

                    <Text style={styles.loadingText}>
                        {t("user_form.loading")}
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
        <View >
            <View
                style={{
                    width: "100%",
                    maxWidth: 768,
                    alignSelf: "center",
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                }}
            >
                <Pressable
                    style={({ pressed }) => [
                        styles.profileRowLink,
                    ]}
                    onPress={() => {
                       router.push("/editProfile");
                    }}
                >
                    {({ pressed }) => (
                        <View
                            style={[
                                styles.profileRow,
                                pressed &&
                                    styles.profileRowPressed,
                            ]}
                        >
                            <View
                                style={styles.avatar}
                            >
                                <Text
                                    style={
                                        styles.avatarText
                                    }
                                >
                                    {initials}
                                </Text>
                            </View>

                            <View
                                style={
                                    styles.profileText
                                }
                            >
                                <Text
                                    style={
                                        styles.greeting
                                    }
                                >
                                    {t(
                                        "user_form.hello"
                                    )}
                                    , {user.name}
                                </Text>

                                <Text
                                    style={
                                        styles.subtitle
                                    }
                                >
                                    {t(
                                        "nav.my_profile"
                                    )}
                                </Text>
                            </View>

                            <View
                                style={
                                    styles.streakBadge
                                }
                            >
                                <Text
                                    style={
                                        styles.streakBadgeText
                                    }
                                >
                                    🔥
                                </Text>
                            </View>

                            <Text
                                style={
                                    styles.chevron
                                }
                            >
                                ›
                            </Text>
                        </View>
                    )}
                </Pressable>

                {user.role === "ADMIN" && (
                    <Pressable
                        style={({ pressed }) => [
                            styles.adminBtnLink,
                        ]}
                        onPress={() => {
                            // Navigate to /exercise-creator
                        }}
                    >
                        {({ pressed }) => (
                            <View
                                style={[
                                    styles.adminBtn,
                                    pressed &&
                                        styles.adminBtnPressed,
                                ]}
                            >
                                <Text
                                    style={
                                        styles.adminBtnText
                                    }
                                >
                                    +{" "}
                                    {t(
                                        "user_form.create_exercise"
                                    )}
                                </Text>

                                <Text
                                    style={
                                        styles.adminTag
                                    }
                                >
                                    {t(
                                        "account.admin_badge"
                                    )}
                                </Text>
                            </View>
                        )}
                    </Pressable>
                )}

                {!workout.id ? (
                    <Pressable
                        onPress={startWorkout}
                        style={({ pressed }) => [
                            styles.primaryCta,
                            pressed &&
                                styles.primaryCtaPressed,
                        ]}
                    >
                        <Text
                            style={
                                styles.primaryCtaText
                            }
                        >
                            {t(
                                "user_form.start_workout"
                            )}
                        </Text>
                    </Pressable>
                ) : (
                    <View
                        style={
                            styles.activeWorkoutWrapper
                        }
                    >
                        <ActiveWorkout />
                    </View>
                )}

                <Text
                    style={styles.sectionLabel}
                >
                    {t(
                        "user_form.title_profile"
                    )}
                </Text>

                <View style={styles.card}>
                    <View
                        style={styles.statRow}
                    >
                        <Text
                            style={
                                styles.statLabel
                            }
                        >
                            {t("user_form.age")}
                        </Text>

                        <Text
                            style={
                                styles.statValue
                            }
                        >
                            {user.userProfile?.age || "—"}{" "}
                            {t("user_form.years")}
                        </Text>
                    </View>

                    <View
                        style={styles.statRow}
                    >
                        <Text
                            style={
                                styles.statLabel
                            }
                        >
                            {t("user_form.gender")}
                        </Text>

                        <Text
                            style={
                                styles.statValue
                            }
                        >
                            {user.userProfile?.gender
                                ? t(
                                      `database.genders.${user.userProfile.gender}`
                                  )
                                : "—"}
                        </Text>
                    </View>

                    <View
                        style={styles.statRow}
                    >
                        <Text
                            style={
                                styles.statLabel
                            }
                        >
                            {t("user_form.height")}
                        </Text>

                        <Text
                            style={
                                styles.statValue
                            }
                        >
                            {user.userProfile?.height || "—"}{" "}
                            {t("user_form.cm")}
                        </Text>
                    </View>

                    <View
                        style={styles.statRow}
                    >
                        <Text
                            style={
                                styles.statLabel
                            }
                        >
                            {t("user_form.weight")}
                        </Text>

                        <Text
                            style={
                                styles.statValue
                            }
                        >
                            {user.userProfile?.weight || "—"}{" "}
                            {t("user_form.kg")}
                        </Text>
                    </View>

                    <View
                        style={[
                            styles.statRow,
                            styles.statRowLast,
                        ]}
                    >
                        <Text
                            style={
                                styles.statLabel
                            }
                        >
                            {t("user_form.goal")}
                        </Text>

                        <Text
                            style={[
                                styles.statValue,
                                styles.goalValue,
                            ]}
                        >
                            {user.userProfile?.goal
                                ? t(
                                      `database.goals.${user.userProfile.goal}`
                                  )
                                : "—"}
                        </Text>
                    </View>
                </View>

                <Text
                    style={styles.sectionLabel}
                >
                    {t(
                        "user_form.soreness_title"
                    )}
                </Text>

                <View style={styles.card}>
                    <MuscleBodyMap
                        soreness={sorenessData}
                        getColor={
                            getSorenessColor
                        }
                        frontLabel={t(
                            "user_form.view_front"
                        )}
                        backLabel={t(
                            "user_form.view_back"
                        )}
                    />

                    <View
                        style={
                            styles.heatmapLegend
                        }
                    >
                        <View
                            style={
                                styles.legendItem
                            }
                        >
                            <View
                                style={[
                                    styles.legendDot,
                                    {
                                        backgroundColor:
                                            colors.acctFresh,
                                    },
                                ]}
                            />

                            <Text
                                style={
                                    styles.legendItemText
                                }
                            >
                                {t(
                                    "user_form.soreness_fresh"
                                )}
                            </Text>
                        </View>

                        <View
                            style={
                                styles.legendItem
                            }
                        >
                            <View
                                style={[
                                    styles.legendDot,
                                    {
                                        backgroundColor:
                                            colors.acctModerate,
                                    },
                                ]}
                            />

                            <Text
                                style={
                                    styles.legendItemText
                                }
                            >
                                {t(
                                    "user_form.soreness_moderate"
                                )}
                            </Text>
                        </View>

                        <View
                            style={
                                styles.legendItem
                            }
                        >
                            <View
                                style={[
                                    styles.legendDot,
                                    {
                                        backgroundColor:
                                            colors.acctSore,
                                    },
                                ]}
                            />

                            <Text
                                style={
                                    styles.legendItemText
                                }
                            >
                                {t(
                                    "user_form.soreness_high"
                                )}
                            </Text>
                        </View>
                    </View>
                </View>

                <Text
                    style={styles.sectionLabel}
                >
                    {t(
                        "user_form.proficiency_title"
                    )}
                </Text>

                <View style={styles.card}>
                    <ProficiencyLevelsList
                        groups={
                            proficiencyGroups
                        }
                    />
                </View>

                <Pressable
                    style={({ pressed }) => [
                        styles.ghostBtnLink,
                    ]}
                    onPress={() => {
                        router.push("/history");
                    }}
                >
                    {({ pressed }) => (
                        <View
                            style={[
                                styles.card,
                                styles.historyRow,
                                pressed &&
                                    styles.profileRowPressed,
                            ]}
                        >
                            <View>
                                <Text
                                    style={
                                        styles.historyTitle
                                    }
                                >
                                    {t(
                                        "user_form.workout_history"
                                    )}
                                </Text>

                                <Text
                                    style={
                                        styles.historySubtitle
                                    }
                                >
                                    {t(
                                        "user_form.view_all_workouts"
                                    )}
                                </Text>
                            </View>

                            <Text
                                style={
                                    styles.chevron
                                }
                            >
                                ›
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
        </ScrollView>
    );
}

export default Account;