import {
    ActivityIndicator,
    BackHandler,
    Pressable,
    ScrollView,
    Text,
    View,
    StyleSheet,
    Image,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { BlurView, BlurTargetView } from "expo-blur";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useEffect, useRef } from "react";

import {
    useCreateUserMutation,
    userApi,
} from "../../api/userApi";

import { storeAccessToken } from "../../hooks/useAnonymousAuth";
import { ProfileFormFields } from "./profileFormFields";
import { styles as sharedStyles } from "../../style";
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

    const cardBlurTargetRef = useRef<View | null>(null);
    const footerBlurTargetRef = useRef<View | null>(null);

    const [createUser, { isLoading: isSaving }] =
        useCreateUserMutation();

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
            const result =
                await createUser(requestData).unwrap();

            await storeAccessToken(result.accessToken);

            store.dispatch(
                userApi.util.invalidateTags([
                    "UserSummary",
                ])
            );

            router.replace("/account");
        } catch (error) {
            console.error(
                "Unable to create user profile:",
                error
            );
        }
    };

    return (
        <View style={sharedStyles.formPage}><BlurTargetView
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
                style={sharedStyles.pageBaseOverlay}
                pointerEvents="none"
            />

            <LinearGradient
                colors={[
                    "rgba(6,7,10,0.95)",
                    "rgba(6,7,10,0.55)",
                    "rgba(6,7,10,0)",
                ]}
                locations={[0, 0.55, 1]}
                style={sharedStyles.topOverlay}
                pointerEvents="none"
            />
        </BlurTargetView>


            <BlurTargetView
                ref={footerBlurTargetRef}
                style={StyleSheet.absoluteFill}
                collapsable={false}
            >
                <Image
                    source={require("./style/gym_background.jpg")}
                    style={StyleSheet.absoluteFill}
                    resizeMode="cover"
                />

                <View
                    style={sharedStyles.pageBaseOverlay}
                    pointerEvents="none"
                />

                <LinearGradient
                    colors={[
                        "rgba(6,7,10,0.95)",
                        "rgba(6,7,10,0.55)",
                        "rgba(6,7,10,0)",
                    ]}
                    locations={[0, 0.55, 1]}
                    style={sharedStyles.topOverlay}
                    pointerEvents="none"
                />
                <ScrollView
                    contentContainerStyle={[
                        sharedStyles.scrollContent,
                        {
                            paddingBottom: 120,
                        },
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={sharedStyles.formContainer}>
                        <View style={sharedStyles.formColumn}>

                            <View
                                style={sharedStyles.pageHeading}
                            >
                                <View
                                    style={
                                        sharedStyles.pageHeadingText
                                    }
                                >
                                    <Text
                                        style={
                                            sharedStyles.pageEyebrow
                                        }
                                    >
                                        {t(
                                            "user_form.profile_setup_label"
                                        )}
                                    </Text>

                                    <Text
                                        style={
                                            sharedStyles.pageTitle
                                        }
                                    >
                                        {t(
                                            "user_form.profile_setup_title"
                                        )}
                                    </Text>

                                    <Text
                                        style={
                                            sharedStyles.pageDescription
                                        }
                                    >
                                        {t(
                                            "user_form.profile_setup_description"
                                        )}
                                    </Text>
                                </View>
                            </View>

                            <View style={sharedStyles.form}>
                                <ProfileFormFields
                                    blurTarget={cardBlurTargetRef}
                                />
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </BlurTargetView>

            <BlurView
                blurTarget={footerBlurTargetRef}
                intensity={30}
                tint="dark"
                style={sharedStyles.stickyFooter}
                blurMethod="dimezisBlurView"
                pointerEvents="box-none"
            >
                <Pressable
                    style={sharedStyles.formSubmit}
                    onPress={handleSubmit}
                    disabled={isSaving}
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
                            style={
                                sharedStyles.primaryCtaText
                            }
                        >
                            {t("user_form.title_create")}
                        </Text>
                    )}
                </Pressable>
            </BlurView>
        </View>
    );
}

export default CreateProfileForm;
