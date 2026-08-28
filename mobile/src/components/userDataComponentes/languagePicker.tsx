import { useState } from "react";
import { FlatList, Modal, Pressable, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

import { styles } from "../../style";
import { colors } from "../../style/theme";

interface LanguageOption {
    code: string;
    label: string;
}

const LANGUAGES: LanguageOption[] = [
    { code: "en", label: "English" },
    { code: "uk", label: "Українська" },
    { code: "tr", label: "Türkçe" },
    { code: "it", label: "Italiano" },
    { code: "fr", label: "Français" },
    { code: "cs", label: "Čeština" },
    { code: "de", label: "Deutsch" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" },
    { code: "pl", label: "Polski" },
    { code: "ru", label: "Русский" },
];

export function LanguagePicker() {
    const { i18n, t } = useTranslation();
    const [open, setOpen] = useState(false);

    // i18n.language може бути "en-US" тощо — беремо перші 2 символи
    const activeCode = i18n.language?.toLowerCase().slice(0, 2);
    const active =
        LANGUAGES.find((l) => l.code === activeCode) ?? LANGUAGES[0];

    const selectLanguage = (code: string) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    return (
        <>
            <Pressable
                style={styles.languagePickerTrigger}
                onPress={() => setOpen(true)}
                accessibilityRole="button"
                accessibilityLabel={t("nav.language")}
            >
                <Text style={styles.languagePickerTriggerText}>
                    {active.label}
                </Text>

                <MaterialCommunityIcons
                    name="chevron-down"
                    size={16}
                    color={colors.acctTextSecondary}
                />
            </Pressable>

            <Modal
                visible={open}
                transparent
                animationType="fade"
                onRequestClose={() => setOpen(false)}
            >
                <Pressable
                    style={styles.languagePickerOverlay}
                    onPress={() => setOpen(false)}
                >
                    <Pressable style={styles.languagePickerCard}>
                        <BlurView
                            intensity={50}
                            tint="dark"
                            style={styles.languagePickerBlur}
                            experimentalBlurMethod="dimezisBlurView"
                        >
                            <Text style={styles.languagePickerTitle}>
                                {t("nav.language")}
                            </Text>

                            <FlatList
                                data={LANGUAGES}
                                keyExtractor={(item) => item.code}
                                style={styles.languagePickerList}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    const isActive = item.code === active.code;

                                    return (
                                        <Pressable
                                            style={[
                                                styles.languagePickerOption,
                                                isActive &&
                                                    styles.languagePickerOptionActive,
                                            ]}
                                            onPress={() => selectLanguage(item.code)}
                                        >
                                            <Text
                                                style={[
                                                    styles.languagePickerOptionText,
                                                    isActive &&
                                                        styles.languagePickerOptionTextActive,
                                                ]}
                                            >
                                                {item.label}
                                            </Text>

                                            {isActive && (
                                                <MaterialCommunityIcons
                                                    name="check"
                                                    size={16}
                                                    color={colors.acctAccent}
                                                />
                                            )}
                                        </Pressable>
                                    );
                                }}
                            />
                        </BlurView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

export default LanguagePicker;