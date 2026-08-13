import { useState } from "react";
import { useAuth0 } from "react-native-auth0";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AppDispatch } from "../store/store";
import { useDispatch } from "react-redux";

import { userApi } from "../api/userApi";

import { styles } from "./style/accountStyles";

const AUTH0_CUSTOM_SCHEME = "gymbro";

const AUTH0_AUDIENCE =
    process.env.EXPO_PUBLIC_AUTH0_AUDIENCE;

const LoginMenu = () => {
    const {
        authorize,
        getCredentials,
    } = useAuth0();

    const dispatch = useDispatch<AppDispatch>();
    const { t } = useTranslation();

    const [isProcessing, setIsProcessing] =
        useState(false);

    const loginAndRedirect = async (
        signup: boolean
    ) => {
        if (isProcessing) {
            return;
        }

        setIsProcessing(true);

        try {
            await authorize(
                {
                    scope: "openid profile email",

                    ...(AUTH0_AUDIENCE
                        ? {
                              audience:
                                  AUTH0_AUDIENCE,
                          }
                        : {}),

                    ...(signup
                        ? {
                              additionalParameters: {
                                  screen_hint:
                                      "signup",
                              },
                          }
                        : {
                              connection:
                                  "google-oauth2",
                          }),
                },
                {
                    customScheme:
                        AUTH0_CUSTOM_SCHEME,
                }
            );

            const credentials =
                await getCredentials();

            if (!credentials?.accessToken) {
                throw new Error(
                    "Auth0 access token was not returned"
                );
            }

            await AsyncStorage.setItem(
                "token",
                credentials.accessToken
            );

            try {
                const result = await dispatch(
                    userApi.endpoints.getUserSummary.initiate()
                ).unwrap();

                if (result?.user) {
                    router.replace("/account");
                    return;
                }

                router.replace(
                    "/createProfile"
                );
            } catch (error) {
                router.replace(
                    "/createProfile"
                );
            }
        } catch (error) {
            console.error(
                signup
                    ? "Unable to signup:"
                    : "Unable to login:",
                error
            );
        } finally {
            setIsProcessing(false);
        }
    };

    const handleLogin = async () => {
        await loginAndRedirect(false);
    };

    const handleSignup = async () => {
        await loginAndRedirect(true);
    };

    if (isProcessing) {
        return (
            <View style={styles.card}>
                <ActivityIndicator size="small" />

                <Text style={styles.formHelp}>
                    {t("user_form.loading", {
                        defaultValue:
                            "Завантаження...",
                    })}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.card}>
            <View style={styles.pageHeading}>
                <Text style={styles.pageEyebrow}>
                    {t("home.auth_title", {
                        defaultValue:
                            "Готовий почати?",
                    })}
                </Text>

                <Text style={styles.pageTitle}>
                    {t("nav.login", {
                        defaultValue:
                            "Увійти",
                    })}
                </Text>

                <Text
                    style={
                        styles.pageDescription
                    }
                >
                    {t("home.auth_subtitle", {
                        defaultValue:
                            "Увійди, щоб зберігати тренування, бачити свій прогрес і користуватися особистим профілем.",
                    })}
                </Text>
            </View>

            <View style={styles.formActions}>
                <Pressable
                    onPress={handleLogin}
                    style={({ pressed }) => [
                        styles.primaryCta,
                        pressed &&
                            styles.primaryCtaDisabled,
                    ]}
                >
                    <Text
                        style={
                            styles.primaryCtaText
                        }
                    >
                        {t("nav.login", {
                            defaultValue:
                                "Увійти",
                        })}
                    </Text>
                </Pressable>

                <Pressable
                    onPress={handleSignup}
                    style={({ pressed }) => [
                        styles.ghostButton,
                        pressed &&
                            styles.choiceBtnPressed,
                    ]}
                >
                    <Text
                        style={
                            styles.ghostButtonText
                        }
                    >
                        {t("login.signup", {
                            defaultValue:
                                "Створити акаунт",
                        })}
                    </Text>
                </Pressable>
            </View>

            <Text style={styles.formHelp}>
                {t("login.terms", {
                    defaultValue:
                        "Продовжуючи, ти погоджуєшся з умовами використання.",
                })}
            </Text>
        </View>
    );
};

export default LoginMenu;