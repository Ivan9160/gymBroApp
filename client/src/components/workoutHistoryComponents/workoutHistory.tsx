import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useGetWorkoutsQuery } from "../../api/workoutHistoryApi";
import type { IWorkout } from "../../types";
import { WorkoutHistoryItem } from "./historyItem";
import { useTranslation } from "react-i18next";

const WorkoutHistory = () => {
    const { data: workoutHistory = [], isLoading } = useGetWorkoutsQuery();
    const { t } = useTranslation();

    if (isLoading) {
        return (
            <div className="acct-loading-page">
                <div className="acct-loading-card">
                    <div className="acct-loading-spinner" />
                    <p>{t("workout_history.loading")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="acct-content-page">
            <Container className="acct-content-container">
                <Link to="/account" className="acct-back-link">
                    <span aria-hidden="true">‹</span>
                    {t("workout_history.back_to_account")}
                </Link>

                <div className="acct-page-heading acct-history-heading">
                    <span className="acct-page-eyebrow">
                        {t("workout_history.eyebrow")}
                    </span>
                    <h1>{t("workout_history.title")}</h1>
                    <p>{t("workout_history.description")}</p>
                </div>

                <AnimatePresence mode="popLayout">
                    {workoutHistory.length === 0 ? (
                        <motion.div
                            className="acct-history-empty"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="acct-history-empty-icon">📭</div>
                            <h2>{t("workout_history.empty_title")}</h2>
                            <p>{t("workout_history.empty_message")}</p>
                            <Link
                                to="/account"
                                className="acct-primary-cta acct-history-empty-btn"
                            >
                                {t("workout_history.start_first_workout")}
                            </Link>
                        </motion.div>
                    ) : (
                        <div className="acct-history-list">
                            {workoutHistory.map((workout: IWorkout, index: number) => (
                                <motion.div
                                    key={workout.id}
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: Math.min(index * 0.06, 0.3) }}
                                >
                                    <WorkoutHistoryItem workout={workout} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </Container>
        </div>
    );
};

export default WorkoutHistory;
