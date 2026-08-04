import { Link, useLocation } from "react-router-dom";
import { Activity, Calendar, Clock } from "react-bootstrap-icons";
import type { IExerciseGroup, ISet, IWorkout } from "../../../types";
import {
    useGetExerciseGroupsQuery,
    useGetExercisesQuery,
} from "../../../api/exerciseApi";
import { Group } from "./group";
import { useTranslation } from "react-i18next";

function WorkoutDetails() {
    const location = useLocation();
    const workout = location.state?.workout as IWorkout | undefined;

    const { data: exercises = [] } = useGetExercisesQuery();
    const { data: exerciseGroups = [] } = useGetExerciseGroupsQuery();
    const { t, i18n } = useTranslation();

    const locale = i18n.language?.toLowerCase().startsWith("uk")
        ? "uk-UA"
        : "en-US";

    if (!workout) {
        return (
            <div className="acct-content-page">
                <div className="acct-content-container">
                    <div className="acct-history-empty">
                        <div className="acct-history-empty-icon">🗂️</div>

                        <h2>{t("workout_details.not_found_title")}</h2>

                        <p>{t("workout_details.not_found_message")}</p>

                        <Link
                            to="/history"
                            className="acct-primary-cta acct-history-empty-btn"
                        >
                            {t("workout_details.back_to_history")}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const currentWorkoutGroups = exerciseGroups.filter((group) =>
        workout.sets.some(
            (set: ISet) =>
                exercises.find((ex) => ex.id === set.exerciseId)
                    ?.exerciseGroupId === group.id
        )
    );

    const currentWorkoutExercises = exercises.filter((exercise) =>
        workout.sets.some((set: ISet) => set.exerciseId === exercise.id)
    );

    const uniqueExerciseCount = new Set(
        workout.sets.map((set: ISet) => set.exerciseId)
    ).size;

    const formatTime = (startDate: Date, endDate: Date) => {
        const totalSeconds = Math.max(
            0,
            Math.floor(
                (endDate.getTime() - startDate.getTime()) / 1000
            )
        );

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return [hours, minutes, seconds]
            .map((value) => value.toString().padStart(2, "0"))
            .join(":");
    };

    const formatDate = (dateString: string) =>
        new Date(dateString).toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        });

    return (
        <div className="acct-content-page">
            <div className="acct-content-container">
                <Link
                    to="/history"
                    className="acct-back-link"
                >
                    <span aria-hidden="true">‹</span>
                    {t("workout_details.back_to_history")}
                </Link>

                <div className="acct-details-card">
                    <div className="acct-details-hero">
                        <div>
                            <span className="acct-page-eyebrow">
                                {t("workout_details.eyebrow")}
                            </span>

                            <h1>
                                {t("workout_details.default_name")}
                            </h1>

                            <div className="acct-details-date">
                                <Calendar aria-hidden="true" />

                                <span>
                                    {formatDate(
                                        workout.createdAt.toString()
                                    )}
                                </span>
                            </div>
                        </div>

                        <div className="acct-details-status">
                            {t("workout_details.status_completed")}
                        </div>
                    </div>

                    {/* Duration + exercises are intentionally kept
                        in one horizontal row */}
                    <div className="acct-details-stats acct-details-stats--two">
                        <div className="acct-details-stat">
                            <span>
                                <Clock aria-hidden="true" />
                                {t("workout_details.duration")}
                            </span>

                            <strong>
                                {formatTime(
                                    new Date(workout.createdAt),
                                    new Date(
                                        workout.finishedAt ||
                                            workout.createdAt
                                    )
                                )}
                            </strong>
                        </div>

                        <div className="acct-details-stat">
                            <span>
                                <Activity aria-hidden="true" />
                                {t("workout_details.exercises_count")}
                            </span>

                            <strong>{uniqueExerciseCount}</strong>
                        </div>
                    </div>

                    <div className="acct-details-body">
                        <div className="acct-details-section-heading">
                            <p className="acct-section-label">
                                {t("workout_details.summary_title")}
                            </p>

                            <span className="acct-details-section-count">
                                {t("workout_details.sets_total", {
                                    count: workout.sets.length,
                                })}
                            </span>
                        </div>

                        <div className="acct-details-groups">
                            {currentWorkoutGroups.map(
                                (
                                    group: IExerciseGroup,
                                    groupIndex: number
                                ) => {
                                    const currentGroupExercises =
                                        currentWorkoutExercises.filter(
                                            (exercise) =>
                                                exercise.exerciseGroupId ===
                                                group.id
                                        );

                                    const groupSets = workout.sets.filter(
                                        (set: ISet) =>
                                            currentGroupExercises.some(
                                                (exercise) =>
                                                    exercise.id ===
                                                    set.exerciseId
                                            )
                                    );

                                    return (
                                        <Group
                                            key={group.id}
                                            group={group}
                                            groupIndex={groupIndex}
                                            groupSets={groupSets}
                                            currentGroupExercises={
                                                currentGroupExercises
                                            }
                                        />
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkoutDetails;