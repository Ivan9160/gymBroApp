import { useTranslation } from "react-i18next";
import LoginMenu from "./login";

const HomePage = () => {
    const { t } = useTranslation();

    return (
        <div className="guest-page">
            <div className="guest-container">
                <section className="guest-hero">
                    <div className="guest-hero-badge">
                        🏋️ {t("home.badge", { defaultValue: "Your training space" })}
                    </div>

                    <h1 className="guest-hero-title">
                        {t("home.title", {
                            defaultValue: "Train smarter. Track your progress. Feel better.",
                        })}
                    </h1>

                    <p className="guest-hero-subtitle">
                        {t("home.subtitle", {
                            defaultValue:
                                "GymBro допомагає вести тренування, бачити прогрес і розуміти, коли м'язи готові до наступного навантаження.",
                        })}
                    </p>

                    <LoginMenu />
                </section>

                <section className="guest-feature-grid" aria-label="GymBro features">
                    <article className="guest-feature-card">
                        <div className="guest-feature-icon">📋</div>
                        <h2>
                            {t("home.feature_workouts_title", {
                                defaultValue: "Тренування в одному місці",
                            })}
                        </h2>
                        <p>
                            {t("home.feature_workouts_text", {
                                defaultValue:
                                    "Запускай тренування, додавай підходи та переглядай історію без зайвих кроків.",
                            })}
                        </p>
                    </article>

                    <article className="guest-feature-card">
                        <div className="guest-feature-icon">🧠</div>
                        <h2>
                            {t("home.feature_recovery_title", {
                                defaultValue: "Контроль відновлення",
                            })}
                        </h2>
                        <p>
                            {t("home.feature_recovery_text", {
                                defaultValue:
                                    "Оцінюй втому по групах м'язів і швидко розумій, де варто зменшити навантаження.",
                            })}
                        </p>
                    </article>

                    <article className="guest-feature-card">
                        <div className="guest-feature-icon">📈</div>
                        <h2>
                            {t("home.feature_progress_title", {
                                defaultValue: "Поступовий прогрес",
                            })}
                        </h2>
                        <p>
                            {t("home.feature_progress_text", {
                                defaultValue:
                                    "Слідкуй за рівнями навичок і своїми результатами, щоб бачити реальний розвиток.",
                            })}
                        </p>
                    </article>
                </section>

                <section className="guest-steps-card">
                    <div className="acct-section-label">
                        {t("home.how_title", { defaultValue: "Як це працює" })}
                    </div>

                    <div className="guest-steps">
                        <div className="guest-step">
                            <span className="guest-step-number">1</span>
                            <div>
                                <strong>
                                    {t("home.step_one_title", {
                                        defaultValue: "Створи профіль",
                                    })}
                                </strong>
                                <p>
                                    {t("home.step_one_text", {
                                        defaultValue:
                                            "Заповни базову інформацію та вибери свою ціль.",
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="guest-step">
                            <span className="guest-step-number">2</span>
                            <div>
                                <strong>
                                    {t("home.step_two_title", {
                                        defaultValue: "Почни тренування",
                                    })}
                                </strong>
                                <p>
                                    {t("home.step_two_text", {
                                        defaultValue:
                                            "Додавай вправи та підходи у звичному для себе темпі.",
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="guest-step">
                            <span className="guest-step-number">3</span>
                            <div>
                                <strong>
                                    {t("home.step_three_title", {
                                        defaultValue: "Дивись прогрес",
                                    })}
                                </strong>
                                <p>
                                    {t("home.step_three_text", {
                                        defaultValue:
                                            "Повертайся до статистики, історії та стану м'язів.",
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;
