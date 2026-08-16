import { useAuth0 } from "react-native-auth0";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Switch,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGetExerciseGroupsQuery } from "../api/exerciseApi";
import { useTranslation } from "react-i18next";
import { styles, getGuestContainerStyle } from "../style";

interface ExerciseData {
    name: string;
    groupId: number;
    isBodyweight: boolean;
}

interface ExerciseGroup {
    id: number;
    name: string;
}

function ExerciseCreator() {
    const {
        data: exerciseGroups = [],
    } = useGetExerciseGroupsQuery();

    const { getCredentials } = useAuth0();

    const { t } = useTranslation();

    const navigation = useNavigation();

    const [showSuccess, setShowSuccess] =
        useState(false);

    const [showError, setShowError] =
        useState(false);

    const [createdExerciseName, setCreatedExerciseName] =
        useState("");

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [exerciseData, setExerciseData] =
        useState<ExerciseData>({
            name: "",
            groupId: 0,
            isBodyweight: false,
        });

    useEffect(() => {
        if (
            exerciseGroups.length > 0 &&
            exerciseData.groupId === 0
        ) {
            setExerciseData((previous) => ({
                ...previous,
                groupId: exerciseGroups[0].id,
            }));
        }
    }, [
        exerciseGroups,
        exerciseData.groupId,
    ]);

    useEffect(() => {
        if (!showSuccess) {
            return;
        }

        const timer = setTimeout(() => {
            setShowSuccess(false);
        }, 3500);

        return () => clearTimeout(timer);
    }, [showSuccess]);

    const handleSubmit = async () => {
        const trimmedName =
            exerciseData.name.trim();

        if (
            !trimmedName ||
            !exerciseData.groupId ||
            isSubmitting
        ) {
            return;
        }

        setIsSubmitting(true);
        setShowError(false);

        try {
            const credentials =
                await getCredentials();

            const token =
                credentials.accessToken;

            const apiUrl =
                process.env.EXPO_PUBLIC_API_URL;

            if (!apiUrl) {
                throw new Error(
                    "EXPO_PUBLIC_API_URL is not configured."
                );
            }

            await axios.post(
                `${apiUrl}/exercises`,
                {
                    ...exerciseData,
                    name: trimmedName,
                },
                {
                    headers: {
                        "Content-Type":
                            "application/json",
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setCreatedExerciseName(
                trimmedName
            );

            setShowSuccess(true);

            setExerciseData({
                name: "",
                groupId:
                    exerciseGroups[0]?.id ?? 0,
                isBodyweight: false,
            });
        } catch (error) {
            console.error(
                "Error creating exercise:",
                error
            );

            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedGroup =
        exerciseGroups.find(
            (group: ExerciseGroup) =>
                group.id ===
                exerciseData.groupId
        );

    return (
        <ScrollView
                    style={styles.guestPage}
                    contentContainerStyle={getGuestContainerStyle()}
                    showsVerticalScrollIndicator={false}
                >
        <View style={styles.contentPage}>
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(
                            "Account" as never
                        )
                    }
                    style={styles.backLink}
                    activeOpacity={0.7}
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
                            "exercise_creator.back_to_account"
                        )}
                    </Text>
                </TouchableOpacity>

                <View
                    style={styles.pageHeading}
                >
                    <Text
                        style={
                            styles.pageEyebrow
                        }
                    >
                        {t(
                            "exercise_creator.eyebrow"
                        )}
                    </Text>

                    <Text
                        style={
                            styles.pageTitle
                        }
                    >
                        {t(
                            "exercise_creator.title"
                        )}
                    </Text>

                    <Text
                        style={
                            styles.pageDescription
                        }
                    >
                        {t(
                            "exercise_creator.description"
                        )}
                    </Text>
                </View>

                {showSuccess && (
                    <View
                        style={
                            styles.alertSuccess
                        }
                        accessibilityRole="alert"
                    >
                        <View
                            style={
                                styles.alertContent
                            }
                        >
                            <Text
                                style={
                                    styles.alertTitle
                                }
                            >
                                {t(
                                    "exercise_creator.success_title"
                                )}
                            </Text>

                            <Text
                                style={
                                    styles.alertText
                                }
                            >
                                {t(
                                    "exercise_creator.success",
                                    {
                                        name:
                                            createdExerciseName,
                                    }
                                )}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                setShowSuccess(
                                    false
                                )
                            }
                            style={
                                styles.alertClose
                            }
                            accessibilityLabel={t(
                                "common.close"
                            )}
                        >
                            <Text
                                style={
                                    styles.alertCloseText
                                }
                            >
                                ×
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {showError && (
                    <View
                        style={
                            styles.alertError
                        }
                        accessibilityRole="alert"
                    >
                        <View
                            style={
                                styles.alertContent
                            }
                        >
                            <Text
                                style={
                                    styles.alertTitle
                                }
                            >
                                {t(
                                    "exercise_creator.error_title"
                                )}
                            </Text>

                            <Text
                                style={
                                    styles.alertText
                                }
                            >
                                {t(
                                    "exercise_creator.error_message"
                                )}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={() =>
                                setShowError(
                                    false
                                )
                            }
                            style={
                                styles.alertClose
                            }
                            accessibilityLabel={t(
                                "common.close"
                            )}
                        >
                            <Text
                                style={
                                    styles.alertCloseText
                                }
                            >
                                ×
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                <View style={styles.card}>
                    <View style={styles.form}>
                        <View
                            style={
                                styles.formField
                            }
                        >
                            <Text
                                style={
                                    styles.formLabel
                                }
                            >
                                {t(
                                    "exercise_creator.name_label"
                                )}
                            </Text>

                            <TextInput
                                value={
                                    exerciseData.name
                                }
                                placeholder={t(
                                    "exercise_creator.name_placeholder"
                                )}
                                placeholderTextColor="#77777f"
                                onChangeText={(
                                    name
                                ) =>
                                    setExerciseData(
                                        (previous) => ({
                                            ...previous,
                                            name,
                                        })
                                    )
                                }
                                style={
                                    styles.formControl
                                }
                                maxLength={80}
                                autoCapitalize="sentences"
                                autoCorrect={false}
                            />

                            <Text
                                style={
                                    styles.formHelp
                                }
                            >
                                {t(
                                    "exercise_creator.name_help"
                                )}
                            </Text>
                        </View>

                        <View
                            style={
                                styles.formField
                            }
                        >
                            <Text
                                style={
                                    styles.formLabel
                                }
                            >
                                {t(
                                    "exercise_creator.muscle_group"
                                )}
                            </Text>

                            <View
                                style={
                                    styles.select
                                }
                            >
                                <Text
                                    style={
                                        styles.selectText
                                    }
                                >
                                    {selectedGroup
                                        ? t(
                                              `database.exercise_groups.${selectedGroup.name}`,
                                              {
                                                  defaultValue:
                                                      selectedGroup.name,
                                              }
                                          )
                                        : ""}
                                </Text>
                            </View>

                            {exerciseGroups.length >
                                0 && (
                                <View
                                    style={
                                        styles.selectOptions
                                    }
                                >
                                    {exerciseGroups.map(
                                        (
                                            group: ExerciseGroup
                                        ) => {
                                            const isActive =
                                                group.id ===
                                                exerciseData.groupId;

                                            return (
                                                <TouchableOpacity
                                                    key={
                                                        group.id
                                                    }
                                                    onPress={() =>
                                                        setExerciseData(
                                                            (
                                                                previous
                                                            ) => ({
                                                                ...previous,
                                                                groupId:
                                                                    group.id,
                                                            })
                                                        )
                                                    }
                                                    style={[
                                                        styles.selectOption,
                                                        isActive &&
                                                            styles.selectOptionActive,
                                                    ]}
                                                    activeOpacity={
                                                        0.7
                                                    }
                                                >
                                                    <Text
                                                        style={[
                                                            styles.selectOptionText,
                                                            isActive &&
                                                                styles.selectOptionTextActive,
                                                        ]}
                                                    >
                                                        {t(
                                                            `database.exercise_groups.${group.name}`,
                                                            {
                                                                defaultValue:
                                                                    group.name,
                                                            }
                                                        )}
                                                    </Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                    )}
                                </View>
                            )}

                            {exerciseGroups.length ===
                                0 && (
                                <Text
                                    style={
                                        styles.formHelpWarning
                                    }
                                >
                                    {t(
                                        "exercise_creator.no_groups"
                                    )}
                                </Text>
                            )}
                        </View>

                        <View
                            style={
                                styles.checkboxRow
                            }
                        >
                            <Switch
                                value={
                                    exerciseData.isBodyweight
                                }
                                onValueChange={(
                                    isBodyweight
                                ) =>
                                    setExerciseData(
                                        (previous) => ({
                                            ...previous,
                                            isBodyweight,
                                        })
                                    )
                                }
                            />

                            <View
                                style={
                                    styles.checkboxText
                                }
                            >
                                <Text
                                    style={
                                        styles.checkboxTitle
                                    }
                                >
                                    {t(
                                        "exercise_creator.bodyweight"
                                    )}
                                </Text>

                                <Text
                                    style={
                                        styles.checkboxHelp
                                    }
                                >
                                    {t(
                                        "exercise_creator.bodyweight_help"
                                    )}
                                </Text>
                            </View>
                        </View>

                        <View
                            style={
                                styles.formActions
                            }
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate(
                                        "Account" as never
                                    )
                                }
                                style={
                                    styles.ghostButton
                                }
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={
                                        styles.ghostButtonText
                                    }
                                >
                                    {t(
                                        "common.cancel"
                                    )}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={
                                    handleSubmit
                                }
                                style={[
                                    styles.primaryCta,
                                    (
                                        isSubmitting ||
                                        !exerciseData.name.trim() ||
                                        !exerciseData.groupId
                                    ) &&
                                        styles.primaryCtaDisabled,
                                ]}
                                disabled={
                                    isSubmitting ||
                                    !exerciseData.name.trim() ||
                                    !exerciseData.groupId
                                }
                                activeOpacity={0.8}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator
                                        size="small"
                                        color="#ffffff"
                                    />
                                ) : (
                                    <Text
                                        style={
                                            styles.primaryCtaText
                                        }
                                    >
                                        {t(
                                            "exercise_creator.submit"
                                        )}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View
                    style={styles.tipCard}
                >
                    <Text
                        style={
                            styles.sectionLabel
                        }
                    >
                        {t(
                            "exercise_creator.tip_title"
                        )}
                    </Text>

                    <Text
                        style={styles.tipText}
                    >
                        {t(
                            "exercise_creator.tip_text"
                        )}
                    </Text>
                </View>
            </View>
        </View>
        </ScrollView>
    );
}

export default ExerciseCreator;