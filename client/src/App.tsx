import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./components/style/account.css";
import { Container, Nav } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import HomePage from "./components/home";
import { UserDataForm } from "./components/userDataForm";

function App() {
    const { isAuthenticated } = useAuth0();
    const reduxUser = useSelector((state: any) => state.user);
    const { t, i18n } = useTranslation();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const hasProfile = Boolean(reduxUser.id);
    const isGuestLanding = !isAuthenticated && pathname === "/";

    useEffect(() => {
        if (isAuthenticated && hasProfile && pathname === "/") {
            navigate("/account", { replace: true });
        }
    }, [isAuthenticated, hasProfile, pathname, navigate]);

    const activeLanguage = i18n.language?.toLowerCase().startsWith("uk")
        ? "uk"
        : "en";

    const changeLanguage = (language: "en" | "uk") => {
        i18n.changeLanguage(language);
    };

    return (
        <div className="app-shell">
            <header className="app-header">
                <Container className="app-header-inner">
                    <Link
                        to={hasProfile ? "/account" : "/"}
                        className="app-brand"
                        aria-label={t("nav.brand_aria")}
                    >
                        <span className="app-brand-mark">G</span>
                        <span>GymBro</span>
                    </Link>

                    <Nav className="app-header-nav">
                        {hasProfile && (
                            <>
                                <Nav.Link
                                    as={Link}
                                    to="/account"
                                    className="app-header-link"
                                >
                                    {t("nav.my_profile")}
                                </Nav.Link>
                                <Nav.Link
                                    as={Link}
                                    to="/history"
                                    className="app-header-link app-header-link-secondary"
                                >
                                    {t("nav.history")}
                                </Nav.Link>
                            </>
                        )}

                        {!isAuthenticated && (
                            <div
                                className="app-language-switcher"
                                aria-label={t("nav.language")}
                            >
                                <button
                                    type="button"
                                    className={`app-language-btn ${
                                        activeLanguage === "en" ? "is-active" : ""
                                    }`}
                                    onClick={() => changeLanguage("en")}
                                >
                                    EN
                                </button>
                                <button
                                    type="button"
                                    className={`app-language-btn ${
                                        activeLanguage === "uk" ? "is-active" : ""
                                    }`}
                                    onClick={() => changeLanguage("uk")}
                                >
                                    UK
                                </button>
                            </div>
                        )}
                    </Nav>
                </Container>
            </header>

            <main className="app-main">
                {isGuestLanding ? (
                    <HomePage />
                ) : isAuthenticated && !hasProfile ? (
                    <UserDataForm status="new" />
                ) : (
                    <Outlet />
                )}
            </main>
        </div>
    );
}

export default App;
