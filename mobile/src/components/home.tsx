import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";


import LoginMenu from "./login";
import {
styles,
getGuestContainerStyle,
getGuestHeroTitleStyle,
getResponsiveStyles,
} from "../style";

const HomePage = () => {
    const { t } = useTranslation();

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
                                "GymBro допомагає вести тренування, бачити прогрес і розуміти, коли м'язи готові до наступного навантаження.",
                        })}
                    </Text>

                    <LoginMenu />
                </View>

                <View
                    style={[
                        styles.guestFeatureGrid,
                        ...responsiveStyles,
                    ]}
                >
                    <View style={styles.guestFeatureCard}>
                        <View style={styles.guestFeatureIcon}>
                            <Text style={styles.guestFeatureIconText}>
                                📋
                            </Text>
                        </View>

                        <Text style={styles.guestFeatureTitle}>
                            {t("home.feature_workouts_title", {
                                defaultValue:
                                    "Тренування в одному місці",
                            })}
                        </Text>

                        <Text style={styles.guestFeatureDescription}>
                            {t("home.feature_workouts_text", {
                                defaultValue:
                                    "Запускай тренування, додавай підходи та переглядай історію без зайвих кроків.",
                            })}
                        </Text>
                    </View>

                    <View style={styles.guestFeatureCard}>
                        <View style={styles.guestFeatureIcon}>
                            <Text style={styles.guestFeatureIconText}>
                                🧠
                            </Text>
                        </View>

                        <Text style={styles.guestFeatureTitle}>
                            {t("home.feature_recovery_title", {
                                defaultValue:
                                    "Контроль відновлення",
                            })}
                        </Text>

                        <Text style={styles.guestFeatureDescription}>
                            {t("home.feature_recovery_text", {
                                defaultValue:
                                    "Оцінюй втому по групах м'язів і швидко розумій, де варто зменшити навантаження.",
                            })}
                        </Text>
                    </View>

                    <View style={styles.guestFeatureCard}>
                        <View style={styles.guestFeatureIcon}>
                            <Text style={styles.guestFeatureIconText}>
                                📈
                            </Text>
                        </View>

                        <Text style={styles.guestFeatureTitle}>
                            {t("home.feature_progress_title", {
                                defaultValue:
                                    "Поступовий прогрес",
                            })}
                        </Text>

                        <Text style={styles.guestFeatureDescription}>
                            {t("home.feature_progress_text", {
                                defaultValue:
                                    "Слідкуй за рівнями навичок і своїми результатами, щоб бачити реальний розвиток.",
                            })}
                        </Text>
                    </View>
                </View>

                <View style={styles.guestStepsCard}>
                    <Text style={styles.sectionLabel}>
                        {t("home.how_title", {
                            defaultValue: "Як це працює",
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
