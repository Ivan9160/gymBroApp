import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
    const { logout } = useAuth0();
    const { t } = useTranslation();

    const handleLogout = () => {
        localStorage.removeItem("token");

        logout({
            logoutParams: {
                returnTo: window.location.origin,
            },
        });
    };

    return (
        <button type="button" onClick={handleLogout} className="acct-logout-btn">
            <svg
                className="acct-logout-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
            </svg>

            {t("nav.logout", { defaultValue: "Вийти з акаунта" })}
        </button>
    );
};

export default LogoutButton;