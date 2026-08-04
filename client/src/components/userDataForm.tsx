import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Button, Row, Col, ButtonGroup } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import {
    setUserName,
    setUserAge,
    setUserGender,
    setUserHeight,
    setUserWeight,
    setUserGoal,
} from "../store/slices/userSlice";
import {
    useGetUserSummaryQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
} from "../api/userApi";
import { useTranslation } from "react-i18next";
import LogoutButton from "./logout";

interface Props {
    status: "new" | "existing" | string;
}

export function UserDataForm({ status }: Props) {
    const {
        user: authUser,
        isAuthenticated,
        isLoading,
        getAccessTokenSilently,
    } = useAuth0();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const reduxUser = useSelector((state: any) => state.user);

    const [tokenReady, setTokenReady] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const prepareToken = async () => {
            if (!isAuthenticated) {
                setTokenReady(false);
                return;
            }

            try {
                const token = await getAccessTokenSilently();
                localStorage.setItem("token", token);
                if (isMounted) setTokenReady(true);
            } catch (error) {
                console.error("Unable to prepare access token:", error);
            }
        };

        prepareToken();

        return () => {
            isMounted = false;
        };
    }, [isAuthenticated, getAccessTokenSilently]);

    const { isLoading: isSummaryLoading } = useGetUserSummaryQuery(undefined, {
        skip: !isAuthenticated || !tokenReady,
    });

    const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
    const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

    const isEditingExistingProfile =
        status === "existing" || reduxUser.id != null;
    const isSaving = isCreating || isUpdating;

    const activeLanguage = i18n.language?.toLowerCase().startsWith("uk")
        ? "uk"
        : "en";

    const changeLanguage = (language: "en" | "uk") => {
        i18n.changeLanguage(language);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            isLoading ||
            isSaving ||
            !isAuthenticated ||
            !authUser?.sub
        ) {
            return;
        }

        const requestData = {
            name: reduxUser.name,
            age: reduxUser.age,
            gender: reduxUser.gender,
            height: reduxUser.height,
            weight: reduxUser.weight,
            goal: reduxUser.goal,
            auth0Id: authUser.sub,
        };

        try {
            if (reduxUser.id == null) {
                await createUser(requestData).unwrap();
            } else {
                await updateUser(requestData).unwrap();
            }

            navigate("/account");
        } catch (error) {
            console.error("Unable to save user profile:", error);
        }
    };

    if (tokenReady && isSummaryLoading) {
        return (
            <div className="acct-loading-page">
                <div className="acct-loading-card">
                    <div className="acct-loading-spinner" />
                    <p>{t("user_form.loading")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="acct-form-page">
            <div className="acct-form-container">
                <div className="acct-form-column">
                    {isEditingExistingProfile && (
                        <Link to="/account" className="acct-back-link">
                            <span aria-hidden="true">‹</span>
                            {t("user_form.back_to_account")}
                        </Link>
                    )}

                    <div className="acct-page-heading">
                        <span className="acct-page-eyebrow">
                            {isEditingExistingProfile
                                ? t("user_form.account_settings_label")
                                : t("user_form.profile_setup_label")}
                        </span>

                        <h1>
                            {isEditingExistingProfile
                                ? t("nav.my_profile")
                                : t("user_form.profile_setup_title")}
                        </h1>

                        <p>
                            {isEditingExistingProfile
                                ? t("user_form.account_settings_description")
                                : t("user_form.profile_setup_description")}
                        </p>
                    </div>

                    <Form className="acct-form" onSubmit={handleSubmit}>
                        <section className="acct-form-card">
                            <div className="acct-form-card-header">
                                <p className="acct-section-label">
                                    {t("user_form.personal_data")}
                                </p>
                                <p className="acct-form-card-description">
                                    {t("user_form.personal_data_description")}
                                </p>
                            </div>

                            <div className="acct-form-grid">
                                <Form.Group className="acct-form-field">
                                    <Form.Label className="acct-form-label">
                                        {t("user_form.name")}
                                    </Form.Label>
                                    <Form.Control
                                        value={reduxUser.name || ""}
                                        onChange={(e) =>
                                            dispatch(setUserName(e.target.value))
                                        }
                                        className="acct-form-control"
                                        autoComplete="name"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="acct-form-field">
                                    <Form.Label className="acct-form-label">
                                        {t("user_form.age")}
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        min={1}
                                        max={120}
                                        value={reduxUser.age ?? ""}
                                        onChange={(e) =>
                                            dispatch(
                                                setUserAge(
                                                    Number(e.target.value) || null
                                                )
                                            )
                                        }
                                        className="acct-form-control"
                                        required
                                    />
                                </Form.Group>
                            </div>
                        </section>

                        <section className="acct-form-card">
                            <p className="acct-section-label">
                                {t("user_form.body_data")}
                            </p>

                            <div className="acct-form-field">
                                <Form.Label className="acct-form-label">
                                    {t("user_form.gender")}
                                </Form.Label>

                                <ButtonGroup className="acct-choice-group">
                                    <Button
                                        type="button"
                                        className={`acct-choice-btn ${
                                            reduxUser.gender === "male"
                                                ? "is-active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            dispatch(setUserGender("male"))
                                        }
                                    >
                                        {t("user_form.male")}
                                    </Button>

                                    <Button
                                        type="button"
                                        className={`acct-choice-btn ${
                                            reduxUser.gender === "female"
                                                ? "is-active"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            dispatch(setUserGender("female"))
                                        }
                                    >
                                        {t("user_form.female")}
                                    </Button>
                                </ButtonGroup>
                            </div>

                            <Row className="g-3">
                                <Col xs={12} sm={6}>
                                    <Form.Group>
                                        <Form.Label className="acct-form-label">
                                            {t("user_form.height")}
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            min={1}
                                            max={250}
                                            value={reduxUser.height ?? ""}
                                            onChange={(e) =>
                                                dispatch(
                                                    setUserHeight(
                                                        Number(e.target.value) || null
                                                    )
                                                )
                                            }
                                            className="acct-form-control"
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                                <Col xs={12} sm={6}>
                                    <Form.Group>
                                        <Form.Label className="acct-form-label">
                                            {t("user_form.weight")}
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            min={1}
                                            max={500}
                                            value={reduxUser.weight ?? ""}
                                            onChange={(e) =>
                                                dispatch(
                                                    setUserWeight(
                                                        Number(e.target.value) || null
                                                    )
                                                )
                                            }
                                            className="acct-form-control"
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </section>

                        <section className="acct-form-card">
                            <p className="acct-section-label">{t("user_form.goal")}</p>
                            <p className="acct-form-card-description">
                                {t("user_form.goal_description")}
                            </p>

                            <div className="acct-goal-list">
                                {(["lose", "maintain", "gain"] as const).map(
                                    (goal) => (
                                        <button
                                            key={goal}
                                            type="button"
                                            className={`acct-goal-btn ${
                                                reduxUser.goal === goal
                                                    ? "is-active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                dispatch(setUserGoal(goal as any))
                                            }
                                        >
                                            {t(`user_form.goals.${goal}`)}
                                        </button>
                                    )
                                )}
                            </div>
                        </section>

                        <button
                            type="submit"
                            className="acct-primary-cta acct-form-submit"
                            disabled={isSaving}
                        >
                            {isSaving
                                ? t("user_form.saving")
                                : reduxUser.id == null
                                ? t("user_form.title_create")
                                : t("user_form.title_update")}
                        </button>
                    </Form>

                    {isEditingExistingProfile && (
                        <section className="acct-settings-card">
                            <div className="acct-settings-header">
                                <p className="acct-section-label">
                                    {t("user_form.settings_title")}
                                </p>
                                <p className="acct-settings-description">
                                    {t("user_form.settings_description")}
                                </p>
                            </div>

                            <div className="acct-settings-row">
                                <div>
                                    <strong>{t("user_form.language_title")}</strong>
                                    <span>{t("user_form.language_description")}</span>
                                </div>

                                <div
                                    className="acct-language-options"
                                    aria-label={t("nav.language")}
                                >
                                    <button
                                        type="button"
                                        className={`acct-language-btn ${
                                            activeLanguage === "en"
                                                ? "is-active"
                                                : ""
                                        }`}
                                        onClick={() => changeLanguage("en")}
                                    >
                                        EN
                                    </button>
                                    <button
                                        type="button"
                                        className={`acct-language-btn ${
                                            activeLanguage === "uk"
                                                ? "is-active"
                                                : ""
                                        }`}
                                        onClick={() => changeLanguage("uk")}
                                    >
                                        UK
                                    </button>
                                </div>
                            </div>

                            <div className="acct-settings-row acct-settings-row-danger">
                                <div>
                                    <strong>{t("user_form.logout_title")}</strong>
                                    <span>{t("user_form.logout_description")}</span>
                                </div>
                                <LogoutButton />
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
}
