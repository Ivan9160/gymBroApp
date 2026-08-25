import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, Text, View } from "react-native";
import { useDispatch } from "react-redux";

import { resetUser } from "../store/slices/userSlice";
import { resetWorkout } from "../store/slices/workoutSlice";
import { resetSet } from "../store/slices/setSlice";
import { removeAccessToken } from "../hooks/useAnonymousAuth";
import { styles } from "../style";
import { router } from "expo-router";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";


const LogoutButton = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [isConfirmVisible, setIsConfirmVisible] = useState(false);

    const handleConfirmedLogout = async () => {
        setIsConfirmVisible(false);

        try {
            await AsyncStorage.clear();

            dispatch(resetUser());
            dispatch(resetWorkout());
            dispatch(resetSet());
            await AsyncStorage.clear();
            await removeAccessToken();

            router.replace("/");
        } catch (error) {
            console.error("Unable to logout:", error);
        }
    };

    return (
        <>
            <Pressable
                onPress={() => setIsConfirmVisible(true)}
                style={({ pressed }) => [
                    styles.logoutBtn,
                    pressed && styles.logoutBtnPressed,
                ]}
            >
                {({ pressed }) => (
                    <Text
                        style={[
                            styles.logoutBtnText,
                            pressed && styles.logoutBtnPressedText,
                        ]}
                    >
                        {t("nav.logout", {
                            defaultValue: "Log out",
                        })}
                    </Text>
                )}
            </Pressable>

            <Modal
                visible={isConfirmVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsConfirmVisible(false)}
            >
                <BlurView
                    intensity={15}
                    tint="dark"
                    experimentalBlurMethod="dimezisBlurView"
                    style={styles.logoutModal}
                >
                <View style={styles.logoutModal}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {t("logout.title", {
                                    defaultValue: "Log out?",
                                })}
                            </Text>
                        </View>

                        <View style={styles.modalBody}>
                            <Text style={styles.modalText}>
                                {t("logout.body", {
                                    defaultValue:
                                        "Are you sure you want to log out? Your profile will not be accessible after logging out.",
                                })}
                            </Text>
                        </View>

                        <View style={styles.modalFooter}>
                            <Pressable
                                style={({ pressed }) => [
                                    styles.modalAction,
                                    styles.modalCancel,
                                    pressed && styles.modalCancelPressed,
                                ]}
                                onPress={() => setIsConfirmVisible(false)}
                            >
                                <Text style={styles.modalCancelText}>
                                    {t("logout.cancel", {
                                        defaultValue: "Cancel",
                                    })}
                                </Text>
                            </Pressable>

                            <Pressable
                                style={({ pressed }) => [
                                    styles.modalAction,
                                    styles.modalConfirm,
                                    pressed && styles.modalConfirmPressed,
                                ]}
                                onPress={handleConfirmedLogout}
                            >
                                <Text style={styles.modalConfirmText}>
                                    {t("logout.confirm", {
                                        defaultValue: "Log out",
                                    })}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                </BlurView>
            </Modal>
        </>
    );
};

export default LogoutButton;