import {
    ActivityIndicator,
    BackHandler,
    ImageBackground,
    Pressable,
    ScrollView,
    Text,
    View,
    StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useEffect } from "react";

import { useCreateUserMutation, userApi } from "../../api/userApi";
import { storeAccessToken } from "../../hooks/useAnonymousAuth";
import { ProfileFormFields } from "./profileFormFields";
import { styles } from "../../style";
import { store } from "../../store/store";

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

export function CreateProfileForm() {
    const { t } = useTranslation();

    // No auth check here at all — there's no account yet to be
    // authenticated as. This request IS what creates one.
    const [createUser, { isLoading: isSaving }] = useCreateUserMutation();

    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            () => {
                router.replace("/?fromCreateProfile=true");
                return true;
            }
        );

        return () => subscription.remove();
    }, []);

    const handleSubmit = async () => {
        if (isSaving) {
            return;
        }

        const reduxUser = store.getState().user as ReduxUser;

        if (
            !reduxUser.name ||
            reduxUser.age == null ||
            !reduxUser.gender ||
            reduxUser.height == null ||
            reduxUser.weight == null ||
            !reduxUser.goal
        ) {
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
            const result = await createUser(requestData).unwrap();
            await storeAccessToken(result.accessToken);
            store.dispatch(userApi.util.invalidateTags(['UserSummary']));

            router.replace("/account");
        } catch (error) {
            console.error("Unable to create user profile:", error);
        }
    };

    return (
        <ImageBackground
            source={require("./style/gym_background.jpg")}
            style={styles.formPage}
            resizeMode="cover"
        >
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

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    <View style={styles.formColumn}>
                        <View style={styles.pageHeading}>
                            <View style={styles.pageHeadingText}>
                                <Text style={styles.pageEyebrow}>
                                    {t("user_form.profile_setup_label")}
                                </Text>

                                <Text style={styles.pageTitle}>
                                    {t("user_form.profile_setup_title")}
                                </Text>

                                <Text style={styles.pageDescription}>
                                    {t("user_form.profile_setup_description")}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.form}>
                            <ProfileFormFields />
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.stickyFooter}>
                <Pressable
                    style={[
                        styles.formSubmit,
                        isSaving && { opacity: 0.7 },
                    ]}
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
                            colors={[
                                "#173a8c0a",
                                "#5b9dff2d",
                                "#173a8c0a",
                            ]}
                            locations={[0, 0.5, 1]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={StyleSheet.absoluteFillObject}
                        />

                        {isSaving ? (
                            <ActivityIndicator
                                size="small"
                                color="#ffffff"
                            />
                        ) : (
                            <Text style={styles.primaryCtaText}>
                                {t("user_form.title_create")}
                            </Text>
                        )}
                    </BlurView>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

export default CreateProfileForm;