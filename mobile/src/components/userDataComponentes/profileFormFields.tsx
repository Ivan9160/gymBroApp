import { useState } from "react";

import {
    Pressable,
    Text,
    TextInput,
    View,
    StyleSheet,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
    setUserName,
    setUserAge,
    setUserGender,
    setUserHeight,
    setUserWeight,
    setUserGoal,
} from "../../store/slices/userSlice";

import { styles } from "../../style";
import { colors } from "../../style/theme";

type Goal = "lose" | "maintain" | "gain";
type FormField = "name" | "age" | "height" | "weight";
type MciName = keyof typeof MaterialCommunityIcons.glyphMap;

interface ReduxUser {
    id: number | null;
    name: string;
    age: number | null;
    gender: string;
    height: number | null;
    weight: number | null;
    goal: Goal | null;
}

interface RootState {
    user: ReduxUser;
}

interface ProfileFormFieldsProps {
    blurTarget: React.RefObject<View | null>;
}

const GOAL_ICONS: Record<Goal, MciName> = {
    lose: "fire",
    maintain: "yoga",
    gain: "arm-flex",
};

export function ProfileFormFields({
    blurTarget,
}: ProfileFormFieldsProps) {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const reduxUser = useSelector(
        (state: RootState) => state.user
    );

    const [focusedField, setFocusedField] =
        useState<FormField | null>(null);

    const controlStyle = (field: FormField) => [
        styles.formControl,
        focusedField === field &&
            styles.formControlFocused,
    ];

    return (
        <>
            {/* PERSONAL DATA */}
            <View style={styles.formCard}>
                <BlurView
                    blurTarget={blurTarget}
                    intensity={40}
                    tint="dark"
                    blurMethod="dimezisBlurView"
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.formCardHeader}>
                    <Text style={styles.sectionLabel}>
                        {t("user_form.personal_data")}
                    </Text>

                    <Text
                        style={styles.formCardDescription}
                    >
                        {t(
                            "user_form.personal_data_description"
                        )}
                    </Text>
                </View>

                <View style={styles.formGrid}>
                    <View style={styles.formGridItem}>
                        <View style={styles.fieldLabelRow}>
                            <MaterialCommunityIcons
                                name="account-outline"
                                size={14}
                                color={
                                    colors.acctTextSecondary
                                }
                            />

                            <Text style={styles.formLabel}>
                                {t("user_form.name")}
                            </Text>
                        </View>

                        <TextInput
                            value={reduxUser.name}
                            onChangeText={(value) =>
                                dispatch(
                                    setUserName(value)
                                )
                            }
                            onFocus={() =>
                                setFocusedField("name")
                            }
                            onBlur={() =>
                                setFocusedField(null)
                            }
                            autoComplete="name"
                            style={controlStyle("name")}
                        />
                    </View>

                    <View style={styles.formGridItem}>
                        <View style={styles.fieldLabelRow}>
                            <MaterialCommunityIcons
                                name="calendar-blank-outline"
                                size={14}
                                color={
                                    colors.acctTextSecondary
                                }
                            />

                            <Text style={styles.formLabel}>
                                {t("user_form.age")}
                            </Text>
                        </View>

                        <TextInput
                            value={
                                reduxUser.age != null
                                    ? String(reduxUser.age)
                                    : ""
                            }
                            onChangeText={(value) =>
                                dispatch(
                                    setUserAge(
                                        value
                                            ? Number(value)
                                            : null
                                    )
                                )
                            }
                            onFocus={() =>
                                setFocusedField("age")
                            }
                            onBlur={() =>
                                setFocusedField(null)
                            }
                            keyboardType="numeric"
                            style={controlStyle("age")}
                        />
                    </View>
                </View>
            </View>

                <BlurView
                    blurTarget={blurTarget}
                    intensity={40}
                    tint="dark"
                    blurMethod="dimezisBlurView"
                    style={styles.formCard}
                >

                <Text style={styles.sectionLabel}>
                    {t("user_form.body_data")}
                </Text>

                <View style={styles.formField}>
                    <Text style={styles.formLabel}>
                        {t("user_form.gender")}
                    </Text>

                    <View style={styles.choiceGroup}>
                        {(
                            ["male", "female"] as const
                        ).map((gender) => {
                            const isActive =
                                reduxUser.gender === gender;

                            return (
                                <Pressable
                                    key={gender}
                                    style={({ pressed }) => [
                                        styles.choiceBtn,
                                        isActive &&
                                            styles.choiceBtnActive,
                                        pressed &&
                                            !isActive &&
                                            styles.choiceBtnPressed,
                                    ]}
                                    onPress={() =>
                                        dispatch(
                                            setUserGender(
                                                gender
                                            )
                                        )
                                    }
                                >
                                    <View
                                        style={
                                            styles.choiceBtnContent
                                        }
                                    >
                                        <MaterialCommunityIcons
                                            name={
                                                gender ===
                                                "male"
                                                    ? "gender-male"
                                                    : "gender-female"
                                            }
                                            size={16}
                                            color={
                                                isActive
                                                    ? colors.white
                                                    : colors.acctTextSecondary
                                            }
                                        />

                                        <Text
                                            style={[
                                                styles.choiceBtnText,
                                                isActive &&
                                                    styles.choiceBtnActiveText,
                                            ]}
                                        >
                                            {t(
                                                `user_form.${gender}`
                                            )}
                                        </Text>
                                    </View>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.formGrid}>
                    <View style={styles.formGridItem}>
                        <View
                            style={
                                styles.fieldLabelRow
                            }
                        >
                            <MaterialCommunityIcons
                                name="human-male-height"
                                size={14}
                                color={
                                    colors.acctTextSecondary
                                }
                            />

                            <Text
                                style={styles.formLabel}
                            >
                                {t("user_form.height")}
                            </Text>
                        </View>

                        <TextInput
                            value={
                                reduxUser.height != null
                                    ? String(
                                          reduxUser.height
                                      )
                                    : ""
                            }
                            onChangeText={(value) => {
                                if (value === "") {
                                    dispatch(
                                        setUserHeight(null)
                                    );
                                    return;
                                }

                                const number =
                                    Number(value);

                                if (
                                    !Number.isNaN(number)
                                ) {
                                    dispatch(
                                        setUserHeight(
                                            number
                                        )
                                    );
                                }
                            }}
                            onFocus={() =>
                                setFocusedField("height")
                            }
                            onBlur={() =>
                                setFocusedField(null)
                            }
                            keyboardType="numeric"
                            style={controlStyle("height")}
                        />
                    </View>

                    <View style={styles.formGridItem}>
                        <View
                            style={
                                styles.fieldLabelRow
                            }
                        >
                            <MaterialCommunityIcons
                                name="scale-bathroom"
                                size={14}
                                color={
                                    colors.acctTextSecondary
                                }
                            />

                            <Text
                                style={styles.formLabel}
                            >
                                {t("user_form.weight")}
                            </Text>
                        </View>

                        <TextInput
                            value={
                                reduxUser.weight != null
                                    ? String(
                                          reduxUser.weight
                                      )
                                    : ""
                            }
                            onChangeText={(value) =>
                                dispatch(
                                    setUserWeight(
                                        value
                                            ? Number(value)
                                            : null
                                    )
                                )
                            }
                            onFocus={() =>
                                setFocusedField("weight")
                            }
                            onBlur={() =>
                                setFocusedField(null)
                            }
                            keyboardType="numeric"
                            style={controlStyle("weight")}
                        />
                    </View>
                </View>
            </BlurView>

            <View style={styles.formCard}>
                <BlurView
                    blurTarget={blurTarget}
                    intensity={40}
                    tint="dark"
                    blurMethod="dimezisBlurView"
                    style={StyleSheet.absoluteFill}
                />

                <Text style={styles.sectionLabel}>
                    {t("user_form.goal")}
                </Text>

                <Text
                    style={styles.formCardDescription}
                >
                    {t("user_form.goal_description")}
                </Text>

                <View style={styles.goalList}>
                    {(
                        [
                            "lose",
                            "maintain",
                            "gain",
                        ] as const
                    ).map((goal: Goal) => {
                        const isActive =
                            reduxUser.goal === goal;

                        return (
                            <Pressable
                                key={goal}
                                style={({ pressed }) => [
                                    styles.goalBtn,
                                    isActive &&
                                        styles.goalBtnActive,
                                    pressed &&
                                        !isActive &&
                                        styles.goalBtnPressed,
                                ]}
                                onPress={() =>
                                    dispatch(
                                        setUserGoal(goal)
                                    )
                                }
                            >
                                <View
                                    style={[
                                        styles.goalIconWrap,
                                        isActive &&
                                            styles.goalIconWrapActive,
                                    ]}
                                >
                                    <MaterialCommunityIcons
                                        name={
                                            GOAL_ICONS[goal]
                                        }
                                        size={22}
                                        color={
                                            isActive
                                                ? colors.acctAccent
                                                : colors.acctTextSecondary
                                        }
                                    />
                                </View>

                                <Text
                                    style={[
                                        styles.goalBtnText,
                                        isActive &&
                                            styles.goalBtnActiveText,
                                    ]}
                                >
                                    {t(
                                        `user_form.goals.${goal}`
                                    )}
                                </Text>

                                <Text
                                    style={[
                                        styles.goalBtnDescription,
                                        isActive &&
                                            styles.goalBtnDescriptionActive,
                                    ]}
                                >
                                    {t(
                                        `user_form.goals.${goal}_description`
                                    )}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </>
    );
}

export default ProfileFormFields;