import { useTranslation } from "react-i18next";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";

import {
    styles,
    getGuestContainerStyle,
    getGuestHeroTitleStyle,
    getResponsiveStyles,
} from "../style";

const HomePage = () => {
    const { t } = useTranslation();
    const router = useRouter();

    const responsiveStyles = getResponsiveStyles();

    return (
        <ScrollView
            style={styles.guestPage}
            contentContainerStyle={getGuestContainerStyle()}
            showsVerticalScrollIndicator={false}
        >
        <View>
            <View style={getGuestContainerStyle()}>
                <View style={styles.guestHero}>
                    <View style={styles.guestHeroBadge}>
                        <Text style={styles.guestHeroBadgeText}>
                            🏋️{" "}
                            {t("home.badge", {
                                defaultValue: "Your training space",
                            })}
                        </Text>
                    </View>

                    <Text style={getGuestHeroTitleStyle()}>
                        {t("home.title", {
                            defaultValue:
                                "Train smarter. Track your progress. Feel better.",
                        })}
                    </Text>

                    <Text style={styles.guestHeroSubtitle}>
                        {t("home.subtitle", {
                            defaultValue:
                                "GymBro helps you track your workouts, monitor your progress, and understand when your muscles are ready for the next challenge.",
                        })}
                    </Text>

                    <Pressable
                        style={styles.guestHeroCta}
                        onPress={() => router.push("/login")}
                    >
                        <Text style={styles.guestHeroCtaText}>
                            {t("home.cta_start", {
                                defaultValue: "Get Started",
                            })}
                        </Text>
                    </Pressable>
                </View>

                <View
                    style={[
                        styles.guestFeatureGrid,
                        ...responsiveStyles,
                    ]}
                >
                    <View style={styles.guestFeatureCard}>
                        <View style={styles.guestFeatureHeader}>
                            <View style={styles.guestFeatureIcon}>
                                <Text style={styles.guestFeatureIconText}>
                                    📋
                                </Text>
                            </View>

                            <Text style={styles.guestFeatureTitle}>
                                {t("home.feature_workouts_title", {
                                    defaultValue: "Training in one place",
                                })}
                            </Text>
                        </View>

                        <Text style={styles.guestFeatureDescription}>
                            {t("home.feature_workouts_text", {
                                defaultValue:
                                    "Launch workouts, add sets, and view your history without unnecessary steps.",
                            })}
                        </Text>
                    </View>

                    <View style={styles.guestFeatureCard}>
                        <View style={styles.guestFeatureHeader}>
                            <View style={styles.guestFeatureIcon}>
                                <Text style={styles.guestFeatureIconText}>
                                    🧠
                                </Text>
                            </View>

                            <Text style={styles.guestFeatureTitle}>
                                {t("home.feature_recovery_title", {
                                    defaultValue:
                                        "Control Recovery",
                                })}
                            </Text>
                        </View>

                        <Text style={styles.guestFeatureDescription}>
                            {t("home.feature_recovery_text", {
                                defaultValue:
                                    "Evaluate muscle soreness by group and quickly understand where you should reduce the load.",
                            })}
                        </Text>
                    </View>

                    <View style={styles.guestFeatureCard}>
                        <View style={styles.guestFeatureHeader}>
                            <View style={styles.guestFeatureIcon}>
                                <Text style={styles.guestFeatureIconText}>
                                    📈
                                </Text>
                            </View>

                        <Text style={styles.guestFeatureTitle}>
                            {t("home.feature_progress_title", {
                                defaultValue:
                                    "Progressive Progress",
                            })}
                        </Text>
                        </View>

                        <Text style={styles.guestFeatureDescription}>
                            {t("home.feature_progress_text", {
                                defaultValue:
                                    "Track your skill levels and results to see real development over time.",
                            })}
                        </Text>
                    </View>
                </View>

                <View style={styles.guestStepsCard}>
                    <Text style={styles.sectionLabel}>
                        {t("home.how_title", {
                            defaultValue: "How It Works",
                        })}
                    </Text>

                    <View
                        style={[
                            styles.guestSteps,
                            ...responsiveStyles,
                        ]}
                    >
                        <View style={styles.guestStep}>
                            <View style={styles.guestStepNumber}>
                                <Text style={styles.guestStepNumberText}>
                                    1
                                </Text>
                            </View>

                            <View style={styles.guestStepContent}>
                                <Text style={styles.guestStepTitle}>
                                    {t("home.step_one_title", {
                                        defaultValue:
                                            "Створи профіль",
                                    })}
                                </Text>

                                <Text
                                    style={
                                        styles.guestStepDescription
                                    }
                                >
                                    {t("home.step_one_text", {
                                        defaultValue:
                                            "Заповни базову інформацію та вибери свою ціль.",
                                    })}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.guestStep}>
                            <View style={styles.guestStepNumber}>
                                <Text style={styles.guestStepNumberText}>
                                    2
                                </Text>
                            </View>

                            <View style={styles.guestStepContent}>
                                <Text style={styles.guestStepTitle}>
                                    {t("home.step_two_title", {
                                        defaultValue:
                                            "Почни тренування",
                                    })}
                                </Text>

                                <Text
                                    style={
                                        styles.guestStepDescription
                                    }
                                >
                                    {t("home.step_two_text", {
                                        defaultValue:
                                            "Додавай вправи та підходи у звичному для себе темпі.",
                                    })}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.guestStep}>
                            <View style={styles.guestStepNumber}>
                                <Text style={styles.guestStepNumberText}>
                                    3
                                </Text>
                            </View>

                            <View style={styles.guestStepContent}>
                                <Text style={styles.guestStepTitle}>
                                    {t("home.step_three_title", {
                                        defaultValue:
                                            "Дивись прогрес",
                                    })}
                                </Text>

                                <Text
                                    style={
                                        styles.guestStepDescription
                                    }
                                >
                                    {t("home.step_three_text", {
                                        defaultValue:
                                            "Повертайся до статистики, історії та стану м'язів.",
                                    })}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
    );
};

export default HomePage;