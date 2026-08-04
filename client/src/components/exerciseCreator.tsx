import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetExerciseGroupsQuery } from "../api/exerciseApi";
import { useTranslation } from "react-i18next";

interface ExerciseData {
    name: string;
    groupId: number;
    isBodyweight: boolean;
}

function ExerciseCreator() {
    const { data: exerciseGroups = [] } = useGetExerciseGroupsQuery();
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [createdExerciseName, setCreatedExerciseName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [exerciseData, setExerciseData] = useState<ExerciseData>({
        name: "",
        groupId: 0,
        isBodyweight: false,
    });

    useEffect(() => {
        if (exerciseGroups.length > 0 && exerciseData.groupId === 0) {
            setExerciseData((prev) => ({
                ...prev,
                groupId: exerciseGroups[0].id,
            }));
        }
    }, [exerciseGroups, exerciseData.groupId]);

    useEffect(() => {
        if (!showSuccess) return;
        const timer = window.setTimeout(() => setShowSuccess(false), 3500);
        return () => window.clearTimeout(timer);
    }, [showSuccess]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = exerciseData.name.trim();
        if (!trimmedName || !exerciseData.groupId || isSubmitting) return;

        setIsSubmitting(true);
        setShowError(false);

        try {
            const token = await getAccessTokenSilently();

            await axios.post(
                `${import.meta.env.VITE_API_URL}/exercises`,
                { ...exerciseData, name: trimmedName },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCreatedExerciseName(trimmedName);
            setShowSuccess(true);
            setExerciseData({
                name: "",
                groupId: exerciseGroups[0]?.id || 0,
                isBodyweight: false,
            });
        } catch (error) {
            console.error("Error creating exercise:", error);
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="acct-content-page">
            <div className="acct-content-container">
                <Link to="/account" className="acct-back-link">
                    <span aria-hidden="true">‹</span>
                    {t("exercise_creator.back_to_account")}
                </Link>

                <div className="acct-page-heading">
                    <span className="acct-page-eyebrow">
                        {t("exercise_creator.eyebrow")}
                    </span>
                    <h1>{t("exercise_creator.title")}</h1>
                    <p>{t("exercise_creator.description")}</p>
                </div>

                {showSuccess && (
                    <div className="acct-alert acct-alert-success" role="status" aria-live="polite">
                        <strong>{t("exercise_creator.success_title")}</strong>
                        <span>
                            {t("exercise_creator.success", {
                                name: createdExerciseName,
                            })}
                        </span>
                        <button
                            type="button"
                            className="acct-alert-close"
                            onClick={() => setShowSuccess(false)}
                            aria-label={t("common.close")}
                        >
                            ×
                        </button>
                    </div>
                )}

                {showError && (
                    <div className="acct-alert acct-alert-error" role="alert" aria-live="assertive">
                        <strong>{t("exercise_creator.error_title")}</strong>
                        <span>{t("exercise_creator.error_message")}</span>
                        <button
                            type="button"
                            className="acct-alert-close"
                            onClick={() => setShowError(false)}
                            aria-label={t("common.close")}
                        >
                            ×
                        </button>
                    </div>
                )}

                <div className="acct-card acct-creator-card">
                    <Form onSubmit={handleSubmit} className="acct-form">
                        <Form.Group className="acct-form-field">
                            <Form.Label className="acct-form-label">
                                {t("exercise_creator.name_label")}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                value={exerciseData.name}
                                placeholder={t("exercise_creator.name_placeholder")}
                                onChange={(e) =>
                                    setExerciseData({
                                        ...exerciseData,
                                        name: e.target.value,
                                    })
                                }
                                className="acct-form-control"
                                maxLength={80}
                                required
                            />
                            <div className="acct-form-help">
                                {t("exercise_creator.name_help")}
                            </div>
                        </Form.Group>

                        <Form.Group className="acct-form-field">
                            <Form.Label className="acct-form-label">
                                {t("exercise_creator.muscle_group")}
                            </Form.Label>
                            <Form.Select
                                value={exerciseData.groupId}
                                onChange={(e) =>
                                    setExerciseData({
                                        ...exerciseData,
                                        groupId: Number(e.target.value),
                                    })
                                }
                                className="acct-form-control acct-form-select"
                                disabled={exerciseGroups.length === 0}
                            >
                                {exerciseGroups.map((group: any) => (
                                    <option key={group.id} value={group.id}>
                                        {t(`database.exercise_groups.${group.name}`, {
                                            defaultValue: group.name,
                                        })}
                                    </option>
                                ))}
                            </Form.Select>

                            {exerciseGroups.length === 0 && (
                                <div className="acct-form-help acct-form-help-warning">
                                    {t("exercise_creator.no_groups")}
                                </div>
                            )}
                        </Form.Group>

                        <label className="acct-checkbox-row">
                            <input
                                type="checkbox"
                                checked={exerciseData.isBodyweight}
                                onChange={(e) =>
                                    setExerciseData({
                                        ...exerciseData,
                                        isBodyweight: e.target.checked,
                                    })
                                }
                            />
                            <span>
                                <strong>{t("exercise_creator.bodyweight")}</strong>
                                <small>{t("exercise_creator.bodyweight_help")}</small>
                            </span>
                        </label>

                        <div className="acct-form-actions">
                            <Link to="/account" className="acct-ghost-btn acct-action-btn">
                                {t("common.cancel")}
                            </Link>

                            <button
                                type="submit"
                                className="acct-primary-cta acct-action-btn"
                                disabled={
                                    isSubmitting ||
                                    !exerciseData.name.trim() ||
                                    !exerciseData.groupId
                                }
                            >
                                {isSubmitting
                                    ? t("exercise_creator.submitting")
                                    : t("exercise_creator.submit")}
                            </button>
                        </div>
                    </Form>
                </div>

                <div className="acct-card acct-creator-tip">
                    <p className="acct-section-label">{t("exercise_creator.tip_title")}</p>
                    <p>{t("exercise_creator.tip_text")}</p>
                </div>
            </div>
        </div>
    );
}

export default ExerciseCreator;
