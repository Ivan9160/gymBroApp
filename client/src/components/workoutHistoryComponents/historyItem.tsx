import type { IWorkout } from "../../types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const WorkoutHistoryItem = ({
    workout,
}: {
    workout: IWorkout;
}) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const locale = i18n.language?.toLowerCase().startsWith("uk")
        ? "uk"
        : "en";

    const formatDuration = (
        startDateFromServer: string,
        endDateFromServer?: string
    ) => {
        const startDate = new Date(startDateFromServer);

        const endDate = endDateFromServer
            ? new Date(endDateFromServer)
            : startDate;

        const totalMinutes = Math.max(
            0,
            Math.round(
                (endDate.getTime() - startDate.getTime()) / 60000
            )
        );

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return [
            hours > 0
                ? `${hours} ${t("workout_history.hours")}`
                : "",
            minutes > 0 || hours === 0
                ? `${minutes} ${t("workout_history.minutes")}`
                : "",
        ]
            .filter(Boolean)
            .join(" ");
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString(locale, {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const formatTime = (dateString: string) =>
        new Date(dateString).toLocaleTimeString(locale, {
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <article className="acct-history-card">
            <div className="acct-history-card-header">
                <div>
                    <span className="acct-history-card-eyebrow">
                        {t("workout_history.completed")}
                    </span>

                    <div className="acct-history-card-date">
                        {formatDate(workout.createdAt.toString())}

                        <span>·</span>

                        {t("workout_history.at")}{" "}
                        {formatTime(workout.createdAt.toString())}
                    </div>
                </div>

                {/* i18next chooses sets_count_one / sets_count_other
                    according to the count */}
                <div className="acct-history-badge">
                    {t("workout_history.sets_count", {
                        count: workout.sets.length,
                    })}
                </div>
            </div>

            <div className="acct-history-set-list">
                {workout.sets.length > 0 ? (
                    workout.sets
                        .slice(0, 3)
                        .map((set: any, index: number) => (
                            <div
                                key={set.id || index}
                                className="acct-history-set-row"
                            >
                                <div className="acct-history-set-main">
                                    <span className="acct-history-set-index">
                                        {index + 1}
                                    </span>

                                    <div>
                                        <strong>
                                            {t(
                                                `database.exercises.${set.exercise?.name}`,
                                                {
                                                    defaultValue:
                                                        set.exercise?.name ||
                                                        "—",
                                                }
                                            )}
                                        </strong>

                                        <span>
                                            {t(
                                                "workout_history.set_number",
                                                {
                                                    number: index + 1,
                                                }
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className="acct-history-set-value">
                                    {set.weight > 0
                                        ? `${set.weight} ${t(
                                              "workout_history.kg"
                                          )} × ${set.reps}`
                                        : `${t(
                                              "workout_history.bodyweight"
                                          )} × ${set.reps}`}
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="acct-history-empty-inline">
                        {t("workout_history.empty")}
                    </div>
                )}
            </div>

            {workout.sets.length > 3 && (
                <div className="acct-history-more">
                    {t("workout_history.more", {
                        count: workout.sets.length - 3,
                    })}
                </div>
            )}

            <div className="acct-history-card-footer">
                <div className="acct-history-duration">
                    <span>{t("workout_history.duration")}</span>

                    <strong>
                        {formatDuration(
                            workout.createdAt.toString(),
                            workout.finishedAt?.toString()
                        )}
                    </strong>
                </div>

                <button
                    type="button"
                    className="acct-ghost-btn acct-history-review-btn"
                    onClick={() =>
                        navigate("/history/review", {
                            state: { workout },
                        })
                    }
                >
                    {t("workout_history.view_detailed")}

                    <span aria-hidden="true">›</span>
                </button>
            </div>
        </article>
    );
};