import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
    StyleSheet,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { BlurView, BlurTargetView } from "expo-blur";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useRef } from "react";

import {
    useGetUserSummaryQuery,
    useUpdateUserMutation,
} from "../../api/userApi";
import { useAnonymousAuth } from "../../hooks/useAnonymousAuth";
import { ProfileFormFields } from "./profileFormFields";
import { styles } from "../../style";
import LogoutButton from "../logout";
import { LanguagePicker } from "./languagePicker";
import { setUserAge, setUserGender, setUserGoal, setUserName, setUserHeight, setUserWeight } from "../../store/slices/userSlice";

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

export function EditProfileForm() {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const reduxUser = useSelector(
        (state: RootState) => state.user
    );

    const cardBlurTargetRef = useRef<View | null>(null);
    const footerBlurTargetRef = useRef<View | null>(null);

    const { tokenReady } = useAnonymousAuth();

    const { isLoading: isSummaryLoading } =
        useGetUserSummaryQuery(undefined, {
            skip: !tokenReady,
        });

    const [updateUser, { isLoading: isSaving }] =
        useUpdateUserMutation();

    const handleSubmit = async () => {
        if (isSaving || !tokenReady) {
            return;
        }

        const requestData = {
            name: reduxUser.name,
            age: reduxUser.age,
            gender: reduxUser.gender,
            height: reduxUser.height,
            weight: reduxUser.weight,
            goal: reduxUser.goal,
        };

        dispatch(
            setUserName(requestData.name),
            setUserAge(requestData.age),
            setUserGender(requestData.gender),
            setUserHeight(requestData.height),
            setUserWeight(requestData.weight),
            setUserGoal(requestData.goal),
        );

        router.replace("/account");

        try {
            await updateUser(requestData).unwrap();

        } catch (error) {
            console.error(
                "Unable to update user profile:",
                error
            );
        }
    };

    // if (tokenReady && isSummaryLoading) {
    //     return (
    //         <View style={styles.loadingPage}>
    //             <View style={styles.loadingCard}>
    //                 <ActivityIndicator
    //                     size="small"
    //                     style={styles.loadingSpinner}
    //                 />

    //                 <Text style={styles.loadingText}>
    //                     {t("user_form.loading")}
    //                 </Text>
    //             </View>
    //         </View>
    //     );
    // }

    return (
        <View style={styles.formPage}>
            <BlurTargetView
                ref={cardBlurTargetRef}
                style={StyleSheet.absoluteFill}
                collapsable={false}
            >
                <Image
                    source={require("./style/gym_background.jpg")}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                />

                <View
                    style={styles.pageBaseOverlay}
                    pointerEvents="none"
                />

                <LinearGradient
                    colors={[
                        "rgba(6,7,10,0.95)",
                        "rgba(6,7,10,0.55)",
                        "rgba(6,7,10,0)",
                    ]}
                    locations={[0, 0.55, 1]}
                    style={styles.topOverlay}
                    pointerEvents="none"
                />
            </BlurTargetView>

            <BlurTargetView
                ref={footerBlurTargetRef}
                style={StyleSheet.absoluteFill}
                collapsable={false}
                pointerEvents="none"
            >
                <Image
                    source={require("./style/gym_background.jpg")}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                />

                <View
                    style={styles.pageBaseOverlay}
                    pointerEvents="none"
                />

                <LinearGradient
                    colors={[
                        "rgba(6,7,10,0.95)",
                        "rgba(6,7,10,0.55)",
                        "rgba(6,7,10,0)",
                    ]}
                    locations={[0, 0.55, 1]}
                    style={styles.topOverlay}
                    pointerEvents="none"
                />
            </BlurTargetView>

            {/* Main content */}
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingBottom: 120,
                    },
                ]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    <View style={styles.formColumn}>
                        <Pressable
                            style={styles.backLink}
                            onPress={() =>
                                router.replace("/account")
                            }
                        >
                            <Text style={styles.backLinkArrow}>
                                ‹
                            </Text>

                            <Text style={styles.backLinkText}>
                                {t(
                                    "user_form.back_to_account"
                                )}
                            </Text>
                        </Pressable>

                        <View style={styles.pageHeading}>
                            <View style={styles.pageHeadingText}>
                                <Text style={styles.pageEyebrow}>
                                    {t(
                                        "user_form.account_settings_label"
                                    )}
                                </Text>

                                <Text style={styles.pageTitle}>
                                    {t("nav.my_profile")}
                                </Text>

                                <Text
                                    style={
                                        styles.pageDescription
                                    }
                                >
                                    {t(
                                        "user_form.account_settings_description"
                                    )}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.form}>
                            <ProfileFormFields
                                blurTarget={cardBlurTargetRef}
                            />
                        </View>

                        {/* Settings card */}
                        <BlurView
                            blurTarget={cardBlurTargetRef}
                            intensity={40}
                            tint="dark"
                            style={styles.settingsCard}
                            blurMethod="dimezisBlurView"
                            collapsable={false}
                        >
                            <View style={styles.settingsHeader}>
                                <Text style={styles.sectionLabel}>
                                    {t(
                                        "user_form.settings_title"
                                    )}
                                </Text>

                                <Text
                                    style={
                                        styles.settingsDescription
                                    }
                                >
                                    {t(
                                        "user_form.settings_description"
                                    )}
                                </Text>
                            </View>

                            <View style={styles.settingsRow}>
                                <View
                                    style={
                                        styles.settingsRowContent
                                    }
                                >
                                    <Text
                                        style={
                                            styles.settingsRowTitle
                                        }
                                    >
                                        {t(
                                            "user_form.language_title"
                                        )}
                                    </Text>

                                    <Text
                                        style={
                                            styles.settingsRowDescription
                                        }
                                    >
                                        {t(
                                            "user_form.language_description"
                                        )}
                                    </Text>
                                </View>

                                <LanguagePicker />
                            </View>

                            <View
                                style={[
                                    styles.settingsRow,
                                    styles.settingsRowDanger,
                                ]}
                            >
                                <View
                                    style={
                                        styles.settingsRowContent
                                    }
                                >
                                    <Text
                                        style={
                                            styles.settingsRowTitle
                                        }
                                    >
                                        {t(
                                            "user_form.logout_title"
                                        )}
                                    </Text>

                                    <Text
                                        style={
                                            styles.settingsRowDescription
                                        }
                                    >
                                        {t(
                                            "user_form.logout_description"
                                        )}
                                    </Text>
                                </View>

                                <LogoutButton />
                            </View>
                        </BlurView>
                    </View>
                </View>
            </ScrollView>

            {/* Sticky footer blur */}
            <BlurView
                blurTarget={footerBlurTargetRef}
                intensity={30}
                tint="dark"
                style={styles.stickyFooter}
                blurMethod="dimezisBlurView"
                pointerEvents="box-none"
            >
                <Pressable
                    style={[
                        styles.formSubmit,
                        isSaving && { opacity: 0.7 },
                    ]}
                    disabled={isSaving}
                    onPress={handleSubmit}
                >
                    <LinearGradient
                        colors={[
                            "#173a8c0a",
                            "#5b9dff2d",
                            "#173a8c0a",
                        ]}
                        locations={[0, 0.5, 1]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={StyleSheet.absoluteFill}
                        pointerEvents="none"
                    />

                    {isSaving ? (
                        <ActivityIndicator
                            size="small"
                            color="#ffffff"
                        />
                    ) : (
                        <Text
                            style={styles.primaryCtaText}
                        >
                            {t("user_form.title_update")}
                        </Text>
                    )}
                </Pressable>
            </BlurView>
        </View>
    );
}

export default EditProfileForm;
