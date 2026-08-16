import { useState } from "react";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
    useGetExercisesQuery,
    useGetExerciseGroupsQuery,
} from "../../../api/exerciseApi";

import {
    setWorkoutId,
    setWorkoutStartTime,
    setWorkoutSets,
} from "../../../store/slices/workoutSlice";

import {
    setSetExerciseId,
    setSetMuscleGroup,
    setSetWeight,
    setSetReps,
} from "../../../store/slices/setSlice";

import type {
    IExercise,
    IExerciseGroup,
    ISet,
    IWorkout,
} from "../../../types";

import { styles } from "../../../style";
import { WorkoutTimer } from "./workoutTimer";
import { FinishWorkoutModal } from "./finishWorkoutModal";
import { SwipeableSetItem } from "./swipeableSetItem";

interface SetState {
    exerciseId: number | null;
    muscleGroupId: number | null;
    weight: number;
    reps: number | null;
}

interface WorkoutState extends Omit<IWorkout, "id"> {
    id: number | null;
    startTime: string | Date | null;
}

interface RootState {
    set: SetState;
    workout: WorkoutState;
}

interface DropdownOption {
    id: number;
    label: string;
}

interface DropdownProps {
    label: string;
    value: string;
    placeholder: string;
    disabled?: boolean;
    options: DropdownOption[];
    onChange: (id: number) => void;
}

function DropdownSelect({
    label,
    value,
    placeholder,
    disabled = false,
    options,
    onChange,
}: DropdownProps) {
    const [open, setOpen] = useState(false);

    const handleSelect = (id: number) => {
        onChange(id);
        setOpen(false);
    };

    return (
        <View style={styles.formField}>
            <Text style={styles.formLabel}>
                {label}
            </Text>

            <Pressable
                disabled={disabled}
                onPress={() => setOpen(true)}
                style={({ pressed }) => [
                    {
                        width: "100%",
                        minHeight: 54,
                        paddingHorizontal: 16,
                        paddingVertical: 14,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: disabled
                            ? "#24242A"
                            : "#34343C",
                        backgroundColor: disabled
                            ? "#15151A"
                            : "#18181D",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent:
                            "space-between",
                    },
                    pressed &&
                        !disabled && {
                            opacity: 0.75,
                        },
                ]}
            >
                <Text
                    numberOfLines={1}
                    style={{
                        flex: 1,
                        marginRight: 12,
                        fontSize: 16,
                        lineHeight: 21,
                        color: disabled
                            ? "#5F5F68"
                            : value
                            ? "#FFFFFF"
                            : "#77777F",
                    }}
                >
                    {value || placeholder}
                </Text>

                <Text
                    style={{
                        fontSize: 18,
                        color: disabled
                            ? "#5F5F68"
                            : "#A8A8B2",
                    }}
                >
                    ▾
                </Text>
            </Pressable>

            <Modal
                visible={open}
                transparent
                animationType="fade"
                onRequestClose={() =>
                    setOpen(false)
                }
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor:
                            "rgba(0, 0, 0, 0.65)",
                        justifyContent: "flex-end",
                    }}
                >
                    <Pressable
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}
                        onPress={() =>
                            setOpen(false)
                        }
                    />

                    <View
                        style={{
                            backgroundColor:
                                "#18181D",
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            maxHeight: "80%",
                            minHeight: 250,
                            paddingTop: 14,
                            paddingBottom: 24,
                        }}
                    >
                        <View
                            style={{
                                width: 42,
                                height: 5,
                                borderRadius: 999,
                                alignSelf: "center",
                                backgroundColor:
                                    "#3A3A42",
                                marginBottom: 14,
                            }}
                        />

                        <Text
                            style={{
                                fontSize: 18,
                                fontWeight: "700",
                                color: "#FFFFFF",
                                paddingHorizontal: 20,
                                paddingBottom: 14,
                            }}
                        >
                            {label}
                        </Text>

                        <ScrollView
                            style={{
                                maxHeight: "70%",
                            }}
                            contentContainerStyle={{
                                paddingHorizontal: 12,
                                paddingBottom: 24,
                            }}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled={true}
                            keyboardShouldPersistTaps="handled"
                        >
                            {options.map(
                                (option) => {
                                    const selected =
                                        option.label ===
                                        value;

                                    return (
                                        <Pressable
                                            key={
                                                option.id
                                            }
                                            onPress={() =>
                                                handleSelect(
                                                    option.id
                                                )
                                            }
                                            style={({
                                                pressed,
                                            }) => [
                                                {
                                                    minHeight: 52,
                                                    paddingHorizontal: 16,
                                                    paddingVertical: 14,
                                                    borderRadius: 12,
                                                    marginBottom: 6,
                                                    backgroundColor:
                                                        selected
                                                            ? "#2563EB"
                                                            : "#202027",
                                                    flexDirection:
                                                        "row",
                                                    alignItems:
                                                        "center",
                                                    justifyContent:
                                                        "space-between",
                                                },
                                                pressed && {
                                                    opacity: 0.75,
                                                },
                                            ]}
                                        >
                                            <Text
                                                style={{
                                                    flex: 1,
                                                    fontSize: 16,
                                                    lineHeight: 21,
                                                    fontWeight:
                                                        selected
                                                            ? "700"
                                                            : "500",
                                                    color:
                                                        selected
                                                            ? "#FFFFFF"
                                                            : "#D0D0D7",
                                                }}
                                            >
                                                {
                                                    option.label
                                                }
                                            </Text>

                                            {selected && (
                                                <Text
                                                    style={{
                                                        marginLeft: 12,
                                                        fontSize: 18,
                                                        color: "#FFFFFF",
                                                    }}
                                                >
                                                    ✓
                                                </Text>
                                            )}
                                        </Pressable>
                                    );
                                }
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

function ActiveWorkout() {
    const set = useSelector(
        (state: RootState) => state.set
    );

    const workout = useSelector(
        (state: RootState) => state.workout
    );

    const dispatch = useDispatch();
    const { t } = useTranslation();

    const {
        data: exercises,
        isLoading: exercisesLoading,
    } = useGetExercisesQuery();

    const {
        data: exerciseGroups,
        isLoading: exerciseGroupsLoading,
    } = useGetExerciseGroupsQuery();

    const [
        showConfirmFinishWorkout,
        setShowConfirmFinishWorkout,
    ] = useState(false);

    const isSetValid = () => {
        const exercise = exercises?.find(
            (item: IExercise) =>
                item.id === set.exerciseId
        );

        return Boolean(
            set.exerciseId &&
                set.muscleGroupId &&
                set.reps &&
                (
                    exercise?.isBodyweight ||
                    set.weight
                )
        );
    };

    const handleAddSet = async () => {
    if (!isSetValid()) {
        return;
    }

    try {
        const token =
            await AsyncStorage.getItem("token");

        const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/sets`,
            {
                exerciseId: set.exerciseId,
                weight: set.weight,
                reps: set.reps,
                workoutId: workout.id,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const createdSet: ISet =
            response.data;

        dispatch(
            setWorkoutSets([
                ...workout.sets,
                createdSet,
            ])
        );

        dispatch(setSetWeight(0));
        dispatch(setSetReps(null));
    } catch (error) {
        console.error(
            "Error adding set:",
            error
        );
    }
};

    const handleDeleteSet = async (
        setId: number
    ) => {
        try {
            const updatedSets =
                workout.sets.filter(
                    (item: ISet) =>
                        item.id !== setId
                );

            dispatch(
                setWorkoutSets(updatedSets)
            );

            const token =
                await AsyncStorage.getItem("token");

            await axios.delete(
                `${process.env.EXPO_PUBLIC_API_URL}/sets/${setId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error(
                "Error deleting set:",
                error
            );
        }
    };

    const finishWorkout = async () => {
        if (workout.id === null) {
            return;
        }

        try {
           const token =
                await AsyncStorage.getItem("token");

            await axios.put(
                `${process.env.EXPO_PUBLIC_API_URL}/workouts/${workout.id}`,
                {
                    status: "COMPLETED",
                    finishedAt:
                        new Date().toISOString(),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch(setWorkoutId(null));

            dispatch(
                setWorkoutStartTime(null)
            );

            dispatch(
                setSetExerciseId(1)
            );

            dispatch(
                setSetMuscleGroup(1)
            );

            dispatch(
                setWorkoutSets([])
            );

            setShowConfirmFinishWorkout(false);
        } catch (error) {
            console.error(
                "Error finishing workout:",
                error
            );
        }
    };

    const setExerciseGroup = (
        value: number
    ) => {
        dispatch(
            setSetMuscleGroup(value)
        );

        const firstExercise =
            exercises?.find(
                (exercise: IExercise) =>
                    exercise.exerciseGroupId ===
                    value
            );

        dispatch(
            setSetExerciseId(
                firstExercise?.id ?? null
            )
        );
    };

    const selectedGroup =
        exerciseGroups?.find(
            (group: IExerciseGroup) =>
                group.id ===
                set.muscleGroupId
        );

    const selectedExercise =
        exercises?.find(
            (exercise: IExercise) =>
                exercise.id ===
                set.exerciseId
        );

    const muscleGroupOptions =
        exerciseGroups?.map(
            (group: IExerciseGroup) => ({
                id: group.id,
                label: t(
                    `database.exercise_groups.${group.name}`,
                    {
                        defaultValue:
                            group.name,
                    }
                ),
            })
        ) ?? [];

    const exerciseOptions =
        exercises
            ?.filter(
                (exercise: IExercise) =>
                    exercise.exerciseGroupId ===
                    set.muscleGroupId
            )
            .map(
                (exercise: IExercise) => ({
                    id: exercise.id,
                    label: t(
                        `database.exercises.${exercise.name}`,
                        {
                            defaultValue:
                                exercise.name,
                        }
                    ),
                })
            ) ?? [];

    if (
        exercisesLoading ||
        exerciseGroupsLoading
    ) {
        return (
            <View style={styles.card}>
                <View
                    style={{
                        minHeight: 220,
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                    }}
                >
                    <ActivityIndicator
                        size="small"
                    />
                </View>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <View
                style={styles.formCardHeader}
            >
                <Text
                    style={styles.pageTitle}
                >
                    {t(
                        "active_workout.title"
                    )}
                </Text>

                <WorkoutTimer />
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
                showsVerticalScrollIndicator={
                    false
                }
            >
                <View style={styles.form}>
                    <DropdownSelect
                        label={t(
                            "active_workout.form.exercise_label"
                        )}
                        value={
                            selectedGroup
                                ? t(
                                      `database.exercise_groups.${selectedGroup.name}`,
                                      {
                                          defaultValue:
                                              selectedGroup.name,
                                      }
                                  )
                                : ""
                        }
                        placeholder={t(
                            "active_workout.form.exercise_label",
                            {
                                defaultValue:
                                    "Оберіть групу м'язів",
                            }
                        )}
                        options={
                            muscleGroupOptions
                        }
                        onChange={
                            setExerciseGroup
                        }
                    />

                    <DropdownSelect
                        label={t(
                            "active_workout.form.exercise_label"
                        )}
                        value={
                            selectedExercise
                                ? t(
                                      `database.exercises.${selectedExercise.name}`,
                                      {
                                          defaultValue:
                                              selectedExercise.name,
                                      }
                                  )
                                : ""
                        }
                        placeholder={t(
                            "active_workout.form.exercise_label",
                            {
                                defaultValue:
                                    "Оберіть вправу",
                            }
                        )}
                        disabled={
                            !set.muscleGroupId
                        }
                        options={
                            exerciseOptions
                        }
                        onChange={(
                            exerciseId
                        ) =>
                            dispatch(
                                setSetExerciseId(
                                    exerciseId
                                )
                            )
                        }
                    />

                    <View
                        style={styles.formGrid}
                    >
                        <View
                            style={
                                styles.formGridItem
                            }
                        >
                            <Text
                                style={
                                    styles.formLabel
                                }
                            >
                                {t(
                                    "active_workout.form.weight_label"
                                )}
                            </Text>

                            <TextInput
                                style={
                                    styles.formControl
                                }
                                keyboardType="numeric"
                                placeholder={t(
                                    "active_workout.form.weight_placeholder"
                                )}
                                placeholderTextColor="#77777F"
                                value={
                                    set.weight ===
                                    0
                                        ? ""
                                        : String(
                                              set.weight
                                          )
                                }
                                onChangeText={(
                                    value: string
                                ) =>
                                    dispatch(
                                        setSetWeight(
                                            value
                                                ? Number(
                                                      value
                                                  )
                                                : 0
                                        )
                                    )
                                }
                            />
                        </View>

                        <View
                            style={
                                styles.formGridItem
                            }
                        >
                            <Text
                                style={
                                    styles.formLabel
                                }
                            >
                                {t(
                                    "active_workout.form.reps_label"
                                )}
                            </Text>

                            <TextInput
                                style={
                                    styles.formControl
                                }
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor="#77777F"
                                value={
                                    set.reps === null
                                        ? ""
                                        : String(
                                              set.reps
                                          )
                                }
                                onChangeText={(
                                    value: string
                                ) =>
                                    dispatch(
                                        setSetReps(
                                            value
                                                ? Number(
                                                      value
                                                  )
                                                : null
                                        )
                                    )
                                }
                            />
                        </View>
                    </View>

                    <Pressable
                        onPress={
                            handleAddSet
                        }
                        disabled={
                            !isSetValid()
                        }
                        style={({ pressed }) => [
                            styles.primaryCta,
                            !isSetValid() &&
                                styles.primaryCtaDisabled,
                            pressed &&
                                isSetValid() &&
                                styles.primaryCtaPressed,
                        ]}
                    >
                        <Text
                            style={
                                styles.primaryCtaText
                            }
                        >
                            {t(
                                "active_workout.form.add_set_button"
                            )}
                        </Text>
                    </Pressable>

                    {workout.sets.length >
                        0 && (
                        <View>
                            <Text
                                style={
                                    styles.sectionLabel
                                }
                            >
                                {t(
                                    "active_workout.current_sets"
                                )}
                            </Text>

                            {workout.sets.map(
                                (
                                    workoutSet: ISet,
                                    index: number
                                ) => (
                                    <SwipeableSetItem
                                        key={
                                            workoutSet.id
                                        }
                                        set={
                                            workoutSet
                                        }
                                        exerciseName={
                                            exercises?.find(
                                                (
                                                    exercise: IExercise
                                                ) =>
                                                    exercise.id ===
                                                    workoutSet.exerciseId
                                            )?.name
                                        }
                                        setNumber={
                                            index + 1
                                        }
                                        onDelete={
                                            handleDeleteSet
                                        }
                                    />
                                )
                            )}
                        </View>
                    )}

                    <View
                        style={
                            styles.formActions
                        }
                    >
                        <Pressable
                            onPress={() =>
                                setShowConfirmFinishWorkout(
                                    true
                                )
                            }
                            style={({
                                pressed,
                            }) => [
                                styles.ghostButton,
                                pressed &&
                                    styles.ghostBtnPressed,
                            ]}
                        >
                            <Text
                                style={
                                    styles.ghostButtonText
                                }
                            >
                                {t(
                                    "active_workout.finish_btn"
                                )}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            <FinishWorkoutModal
                show={
                    showConfirmFinishWorkout
                }
                onHide={() =>
                    setShowConfirmFinishWorkout(
                        false
                    )
                }
                onConfirm={
                    finishWorkout
                }
            />
        </View>
    );
}

export default ActiveWorkout;