import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    ActivityIndicator,
    Modal,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
    getLastAccessToken,
    setAccessTokenFromLastToken,
    storeAccessToken,
} from "../hooks/useAnonymousAuth";

import { loginStyles } from "./style/loginStyles";
import { useGetUserSummaryQuery } from "../api/userApi";
import { store } from "../store/store";
import { userApi } from "../api/userApi";

const LoginButton = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [modalVisible, setModalVisible] = useState(false);
    const [tokenInputVisible, setTokenInputVisible] = useState(false);
    const [tokenValue, setTokenValue] = useState("");
    const [hasLastAccount, setHasLastAccount] = useState<boolean | null>(null);
    const [isLoadingLastAccount, setIsLoadingLastAccount] = useState(false);
    const [isSubmittingToken, setIsSubmittingToken] = useState(false);
    const [shouldFetchSummary, setShouldFetchSummary] = useState(false);

    const {
        data: userSummary,
        isError: isUserSummaryError,
        error: userSummaryError,
    } = useGetUserSummaryQuery(undefined, {
        skip: !shouldFetchSummary,
    });

    useEffect(() => {
        if (!shouldFetchSummary) {
            return;
        }

        if (userSummary) {
            store.dispatch(userApi.util.invalidateTags(['UserSummary']));
            router.replace("/account");
        }
    }, [shouldFetchSummary, userSummary, router]);

    useEffect(() => {
        if (isUserSummaryError) {
            console.error("Unable to load user summary after login:", userSummaryError);
            setShouldFetchSummary(false);
        }
    }, [isUserSummaryError, userSummaryError]);

    const openModal = async () => {
        setModalVisible(true);

        try {
            const lastToken = await getLastAccessToken();
            setHasLastAccount(Boolean(lastToken));
        } catch (error) {
            console.error("Unable to check last account:", error);
            setHasLastAccount(false);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setTokenInputVisible(false);
        setTokenValue("");
    };

    const goToApp = () => {
        closeModal();
        setShouldFetchSummary(true);
    };

    const handleLoginToLastAccount = async () => {
        setIsLoadingLastAccount(true);

        try {
            const token = await setAccessTokenFromLastToken();

            if (token) {
                goToApp();
            }
        } catch (error) {
            console.error("Unable to login to last account:", error);
        } finally {
            setIsLoadingLastAccount(false);
        }
    };

    const handleScanQrCode = () => {
        // TODO: додати логіку сканування QR-коду
    };

    const handleSubmitToken = async () => {
        const trimmedToken = tokenValue.trim();

        if (!trimmedToken) {
            return;
        }

        setIsSubmittingToken(true);

        try {
            await storeAccessToken(trimmedToken);
            goToApp();
        } catch (error) {
            console.error("Unable to login with token:", error);
        } finally {
            setIsSubmittingToken(false);
        }
    };

    return (
        <>
            <Pressable
                style={loginStyles.loginTriggerButton}
                onPress={openModal}
            >
                <Text style={loginStyles.loginTriggerText}>
                    {t("home.cta_login", { defaultValue: "Log In" })}
                </Text>
            </Pressable>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={closeModal}
            >
                <Pressable
                    style={loginStyles.modalOverlay}
                    onPress={closeModal}
                >
                    <View
                        style={[
                            loginStyles.modalContent,
                            { paddingBottom: insets.bottom + 20 },
                        ]}
                        onStartShouldSetResponder={() => true}
                    >
                        <View style={loginStyles.modalHandle} />

                        <Text style={loginStyles.modalTitle}>
                            {t("login.title", { defaultValue: "Log In" })}
                        </Text>

                        {hasLastAccount ? (
                            <Pressable
                                style={loginStyles.optionButton}
                                onPress={handleLoginToLastAccount}
                                disabled={isLoadingLastAccount}
                            >
                                {isLoadingLastAccount ? (
                                    <ActivityIndicator />
                                ) : (
                                    <>
                                        <Text style={loginStyles.optionIcon}>
                                            🔑
                                        </Text>
                                        <Text style={loginStyles.optionText}>
                                            {t("login.last_account", {
                                                defaultValue:
                                                    "Login to your last account",
                                            })}
                                        </Text>
                                    </>
                                )}
                            </Pressable>
                        ) : null}

                        <Pressable
                            style={loginStyles.optionButton}
                            onPress={handleScanQrCode}
                        >
                            <Text style={loginStyles.optionIcon}>📷</Text>
                            <Text style={loginStyles.optionText}>
                                {t("login.scan_qr", {
                                    defaultValue: "Scan QR code",
                                })}
                            </Text>
                        </Pressable>

                        <View style={loginStyles.divider}>
                            <View style={loginStyles.dividerLine} />
                            <Text style={loginStyles.dividerText}>
                                {t("login.or", { defaultValue: "or" })}
                            </Text>
                            <View style={loginStyles.dividerLine} />
                        </View>

                        {tokenInputVisible ? (
                            <View style={loginStyles.tokenInputContainer}>
                                <TextInput
                                    style={loginStyles.tokenInput}
                                    placeholder={t(
                                        "login.token_placeholder",
                                        { defaultValue: "Enter your token" }
                                    )}
                                    placeholderTextColor="#9CA3AF"
                                    value={tokenValue}
                                    onChangeText={setTokenValue}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                                <Pressable
                                    style={loginStyles.tokenSubmitButton}
                                    onPress={handleSubmitToken}
                                    disabled={isSubmittingToken}
                                >
                                    {isSubmittingToken ? (
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text
                                            style={
                                                loginStyles.tokenSubmitText
                                            }
                                        >
                                            {t("login.submit_token", {
                                                defaultValue:
                                                    "Login with token",
                                            })}
                                        </Text>
                                    )}
                                </Pressable>
                            </View>
                        ) : (
                            <Pressable
                                style={loginStyles.optionButton}
                                onPress={() => setTokenInputVisible(true)}
                            >
                                <Text style={loginStyles.optionIcon}>🔐</Text>
                                <Text style={loginStyles.optionText}>
                                    {t("login.enter_token", {
                                        defaultValue: "Enter a token",
                                    })}
                                </Text>
                            </Pressable>
                        )}

                        <Pressable
                            style={loginStyles.closeButton}
                            onPress={closeModal}
                        >
                            <Text style={loginStyles.closeButtonText}>
                                {t("common.cancel", {
                                    defaultValue: "Cancel",
                                })}
                            </Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Modal>
        </>
    );
};

export default LoginButton;