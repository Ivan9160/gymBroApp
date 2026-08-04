import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

const LoginMenu = () => {
    const { loginWithRedirect } = useAuth0();
    const { t } = useTranslation();

    const handleLogin = () => {
        sessionStorage.setItem("isLoggingIn", "true");

        loginWithRedirect({
            authorizationParams: {
                connection: "google-oauth2",
            },
        });
    };

    const handleSignup = () => {
        loginWithRedirect({
            authorizationParams: {
                screen_hint: "signup",
            },
        });
    };

    return (
        <div className="guest-auth-card">
            <div className="guest-auth-copy">
                <h2>
                    {t("home.auth_title", {
                        defaultValue: "Готовий почати?",
                    })}
                </h2>
                <p>
                    {t("home.auth_subtitle", {
                        defaultValue:
                            "Увійди, щоб зберігати тренування, бачити свій прогрес і користуватися особистим профілем.",
                    })}
                </p>
            </div>

            <div className="guest-auth-actions">
                <button
                    type="button"
                    onClick={handleLogin}
                    className="acct-primary-cta guest-auth-primary"
                >
                    {t("nav.login", { defaultValue: "Увійти" })}
                </button>

                <button
                    type="button"
                    onClick={handleSignup}
                    className="acct-ghost-btn guest-auth-secondary"
                >
                    {t("login.signup", { defaultValue: "Створити акаунт" })}
                </button>
            </div>

            <p className="guest-auth-note">
                {t("login.terms", {
                    defaultValue: "Продовжуючи, ти погоджуєшся з умовами використання.",
                })}
            </p>
        </div>
    );
};

export default LoginMenu;