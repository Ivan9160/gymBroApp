import {
    ActivityIndicator,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    View,
    StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";

import { useGetUserSummaryQuery, useUpdateUserMutation } from "../../api/userApi";
import { useAnonymousAuth } from "../../hooks/useAnonymousAuth";
import { ProfileFormFields } from "./profileFormFields";
import { styles } from "../../style";
import  LogoutButton  from "../logout";

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
 * Derives up to 2 initials from a display name for the avatar placeholder.
 * Swap this out once real profile photos / uploaded assets are supported.
 */
function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);

    if (parts.length === 0) {
        return "?";
    }

    return parts
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join("");
}

export function EditProfileForm() {
    const { t, i18n } = useTranslation();
    const reduxUser = useSelector((state: RootState) => state.user);

    // Only readiness matters here — there's no separate "user"
    // object anymore. Who the request is for is decided server-side
    // from the token itself, never sent by the client.
    const { tokenReady } = useAnonymousAuth();

    const { isLoading: isSummaryLoading } = useGetUserSummaryQuery(undefined, {
        skip: !tokenReady,
    });

    const [updateUser, { isLoading: isSaving }] = useUpdateUserMutation();

    const activeLanguage = i18n.language?.toLowerCase().startsWith("uk")
        ? "uk"
        : "en";

    const changeLanguage = (language: "en" | "uk") => {
        i18n.changeLanguage(language);
    };

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

        try {
            await updateUser(requestData).unwrap();
            router.replace("/account");
        } catch (error) {
            console.error("Unable to update user profile:", error);
        }
    };

    if (tokenReady && isSummaryLoading) {
        return (
            <View style={styles.loadingPage}>
                <View style={styles.loadingCard}>
                    <ActivityIndicator size="small" style={styles.loadingSpinner} />

                    <Text style={styles.loadingText}>{t("user_form.loading")}</Text>
                </View>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require("./style/gym_background.jpg")}
            style={styles.formPage}
            resizeMode="cover"
        >
            <View style={styles.pageBaseOverlay} pointerEvents="none" />

            <LinearGradient
                colors={["rgba(6,7,10,0.95)", "rgba(6,7,10,0.55)", "rgba(6,7,10,0)"]}
                locations={[0, 0.55, 1]}
                style={styles.topOverlay}
                pointerEvents="none"
            />

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    <View style={styles.formColumn}>
                        <Pressable
                            style={styles.backLink}
                            onPress={() => router.replace("/account")}
                        >
                            <Text style={styles.backLinkArrow}>‹</Text>

                            <Text style={styles.backLinkText}>
                                {t("user_form.back_to_account")}
                            </Text>
                        </Pressable>

                        <View style={styles.pageHeading}>
                            <View style={styles.pageHeadingText}>
                                <Text style={styles.pageEyebrow}>
                                    {t("user_form.account_settings_label")}
                                </Text>

                                <Text style={styles.pageTitle}>{t("nav.my_profile")}</Text>

                                <Text style={styles.pageDescription}>
                                    {t("user_form.account_settings_description")}
                                </Text>
                            </View>

                            {/*
                                Placeholder initials avatar — swap for the real profile
                                photo / uploaded image once that's supported.
                            */}
                            {/* <View style={styles.avatarCircle}>
                                <Text style={styles.avatarText}>
                                    {getInitials(reduxUser.name || "?")}
                                </Text>
                            </View> */}
                        </View>

                        <View style={styles.form}>
                            <ProfileFormFields />
                        </View>

                        <BlurView
                            intensity={40}
                            tint="dark"
                            style={styles.settingsCard}
                            experimentalBlurMethod="dimezisBlurView"
                        >
                            <View style={styles.settingsHeader}>
                                <Text style={styles.sectionLabel}>
                                    {t("user_form.settings_title")}
                                </Text>

                                <Text style={styles.settingsDescription}>
                                    {t("user_form.settings_description")}
                                </Text>
                            </View>

                            <View style={styles.settingsRow}>
                                <View style={styles.settingsRowContent}>
                                    <Text style={styles.settingsRowTitle}>
                                        {t("user_form.language_title")}
                                    </Text>

                                    <Text style={styles.settingsRowDescription}>
                                        {t("user_form.language_description")}
                                    </Text>
                                </View>

                                <View
                                    style={styles.languageSwitcher}
                                    accessibilityLabel={t("nav.language")}
                                >
                                    <Pressable
                                        style={[
                                            styles.languageBtn,
                                            activeLanguage === "en" &&
                                                styles.languageBtnActive,
                                        ]}
                                        onPress={() => changeLanguage("en")}
                                    >
                                        <Text
                                            style={[
                                                styles.languageBtnText,
                                                activeLanguage === "en" &&
                                                    styles.languageBtnActiveText,
                                            ]}
                                        >
                                            EN
                                        </Text>
                                    </Pressable>

                                    <Pressable
                                        style={[
                                            styles.languageBtn,
                                            activeLanguage === "uk" &&
                                                styles.languageBtnActive,
                                        ]}
                                        onPress={() => changeLanguage("uk")}
                                    >
                                        <Text
                                            style={[
                                                styles.languageBtnText,
                                                activeLanguage === "uk" &&
                                                    styles.languageBtnActiveText,
                                            ]}
                                        >
                                            UK
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            <View style={[styles.settingsRow, styles.settingsRowDanger]}>
                                <View style={styles.settingsRowContent}>
                                    <Text style={styles.settingsRowTitle}>
                                        {t("user_form.logout_title")}
                                    </Text>
 
                                    <Text style={styles.settingsRowDescription}>
                                        {t("user_form.logout_description")}
                                    </Text>
                                </View>
 
                                <LogoutButton />
                            </View>

                            
                        </BlurView>
                    </View>
                </View>
            </ScrollView>


            <View style={styles.stickyFooter}>
                <Pressable
                    style={[styles.formSubmit, isSaving && { opacity: 0.7 }]}
                    disabled={isSaving}
                    onPress={handleSubmit}
                >
                    <BlurView
                        intensity={45}
                        tint="dark"
                        style={styles.primaryCtaGradient}
                        experimentalBlurMethod="dimezisBlurView"
                    >
                        <LinearGradient
                            colors={["#173a8c0a", "#5b9dff2d", "#173a8c0a"]}
                            locations={[0, 0.5, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFillObject}
                        />

                        {isSaving ? (
                            <ActivityIndicator size="small" color="#ffffff" />
                        ) : (
                            <Text style={styles.primaryCtaText}>
                                {t("user_form.title_update")}
                            </Text>
                        )}
                    </BlurView>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

export default EditProfileForm;