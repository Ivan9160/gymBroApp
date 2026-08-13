import { Pressable, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
    setUserName,
    setUserAge,
    setUserGender,
    setUserHeight,
    setUserWeight,
    setUserGoal,
} from "../../store/slices/userSlice";

import { styles } from "../style/accountStyles";

type Goal = "lose" | "maintain" | "gain";

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

/**
 * Personal data / body data / goal cards, shared between
 * CreateProfileForm and EditProfileForm. Reads/writes directly
 * to the redux user slice, same as the original component did.
 */
export function ProfileFormFields() {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const reduxUser = useSelector((state: RootState) => state.user);

    return (
        <>
            <View style={styles.formCard}>
                <View style={styles.formCardHeader}>
                    <Text style={styles.sectionLabel}>
                        {t("user_form.personal_data")}
                    </Text>

                    <Text style={styles.formCardDescription}>
                        {t("user_form.personal_data_description")}
                    </Text>
                </View>

                <View style={styles.formGrid}>
                    <View style={styles.formGridItem}>
                        <Text style={styles.formLabel}>{t("user_form.name")}</Text>

                        <TextInput
                            value={reduxUser.name}
                            onChangeText={(value) => dispatch(setUserName(value))}
                            autoComplete="name"
                            style={styles.formControl}
                        />
                    </View>

                    <View style={styles.formGridItem}>
                        <Text style={styles.formLabel}>{t("user_form.age")}</Text>

                        <TextInput
                            value={reduxUser.age != null ? String(reduxUser.age) : ""}
                            onChangeText={(value) =>
                                dispatch(setUserAge(value ? Number(value) : null))
                            }
                            keyboardType="numeric"
                            style={styles.formControl}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.sectionLabel}>{t("user_form.body_data")}</Text>

                <View style={styles.formField}>
                    <Text style={styles.formLabel}>{t("user_form.gender")}</Text>

                    <View style={styles.choiceGroup}>
                        <Pressable
                            style={[
                                styles.choiceBtn,
                                reduxUser.gender === "male" && styles.choiceBtnActive,
                            ]}
                            onPress={() => dispatch(setUserGender("male"))}
                        >
                            <Text
                                style={[
                                    styles.choiceBtnText,
                                    reduxUser.gender === "male" &&
                                        styles.choiceBtnActiveText,
                                ]}
                            >
                                {t("user_form.male")}
                            </Text>
                        </Pressable>

                        <Pressable
                            style={[
                                styles.choiceBtn,
                                reduxUser.gender === "female" && styles.choiceBtnActive,
                            ]}
                            onPress={() => dispatch(setUserGender("female"))}
                        >
                            <Text
                                style={[
                                    styles.choiceBtnText,
                                    reduxUser.gender === "female" &&
                                        styles.choiceBtnActiveText,
                                ]}
                            >
                                {t("user_form.female")}
                            </Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.formGrid}>
                    <View style={styles.formGridItem}>
                        <Text style={styles.formLabel}>{t("user_form.height")}</Text>

                        <TextInput
                            value={
                                reduxUser.height != null ? String(reduxUser.height) : ""
                            }
                            onChangeText={(value) =>
                                dispatch(setUserHeight(value ? Number(value) : null))
                            }
                            keyboardType="numeric"
                            style={styles.formControl}
                        />
                    </View>

                    <View style={styles.formGridItem}>
                        <Text style={styles.formLabel}>{t("user_form.weight")}</Text>

                        <TextInput
                            value={
                                reduxUser.weight != null ? String(reduxUser.weight) : ""
                            }
                            onChangeText={(value) =>
                                dispatch(setUserWeight(value ? Number(value) : null))
                            }
                            keyboardType="numeric"
                            style={styles.formControl}
                        />
                    </View>
                </View>
            </View>

            <View style={styles.formCard}>
                <Text style={styles.sectionLabel}>{t("user_form.goal")}</Text>

                <Text style={styles.formCardDescription}>
                    {t("user_form.goal_description")}
                </Text>

                <View style={styles.goalList}>
                    {(["lose", "maintain", "gain"] as const).map((goal: Goal) => {
                        const isActive = reduxUser.goal === goal;

                        return (
                            <Pressable
                                key={goal}
                                style={[styles.goalBtn, isActive && styles.goalBtnActive]}
                                onPress={() => dispatch(setUserGoal(goal))}
                            >
                                <Text
                                    style={[
                                        styles.goalBtnText,
                                        isActive && styles.goalBtnActiveText,
                                    ]}
                                >
                                    {t(`user_form.goals.${goal}`)}
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