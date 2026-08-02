import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import LogoutButton from "../logout";
import { useGetExercisesQuery, useGetExerciseGroupsQuery } from "../../api/exerciseApi";
import { setWorkoutId, setWorkoutStartTime } from "../../store/slices/workoutSlice";
import axios from "axios";
import ActiveWorkout from "./activeWorkout";
import MuscleBodyMap from "./sorenessDiagram";
import { useTranslation } from "react-i18next";
import "./style/account.css";

// TODO: replace with real data from a soreness endpoint/hook once it exists
// (e.g. useGetSorenessQuery(user.id)). Values are 0-100, higher = more sore.
const MOCK_SORENESS: Record<string, number> = {
    chest: 82,
    shoulders: 20,
    biceps: 25,
    core: 55,
    legs: 78,
    back: 60,
    triceps: 15,
};

function getSorenessColorVar(value: number): string {
    const clampedValue = Math.min(Math.max(value, 0), 100);

    if (clampedValue <= 50) {
        const percentage = clampedValue * 2; // Переводимо 0..50 у 0..100%
        return `color-mix(in srgb, var(--acct-moderate) ${percentage}%, var(--acct-fresh))`;
    } else {
        const percentage = (clampedValue - 50) * 2; // Переводимо 50..100 у 0..100%
        return `color-mix(in srgb, var(--acct-sore) ${percentage}%, var(--acct-moderate))`;
    }
}

function Account() {
    const user = useSelector((state: any) => state.user);
    const workout = useSelector((state: any) => state.workout);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useGetExercisesQuery();
    const { data: exerciseGroups } = useGetExerciseGroupsQuery();

    const startWorkout = () => {
        axios.post(import.meta.env.VITE_API_URL + "/workouts", {
            date: new Date().toISOString(),
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        },
        ).then(response => {
            const createdWorkout = response.data;
            dispatch(setWorkoutId(createdWorkout.id));
            dispatch(setWorkoutStartTime(createdWorkout.createdAt));
        }).catch(error => {
            console.error("Error starting workout:", error);
        });
    }

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : "?";

    // TODO: replace with a real streak endpoint once available
    const mockStreak = 5;

    // TODO: replace percentages with real data from GET /proficiency/:userId
    // once a useGetProficiencyQuery hook exists in the frontend api slice.
    const proficiencyGroups = (exerciseGroups || []).map((group: any) => ({
        id: group.id,
        name: group.name,
        value: ((group.id * 37) % 60) + 30,
    }));

    return (
        <div className="account-page">
            <Container className="py-4">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>

                        <Link to="/editProfile" className="acct-profile-row-link">
                            <div className="acct-profile-row">
                                <div className="acct-avatar">{initials}</div>
                                <div className="acct-profile-text">
                                    <p className="acct-greeting">{t('user_form.hello', { defaultValue: 'Привіт' })}, {user.name}</p>
                                    <p className="acct-subtitle">{t('user_form.title_profile')}</p>
                                </div>
                                <div className="acct-streak-badge">
                                    🔥 {mockStreak}
                                </div>
                                <span className="acct-chevron">›</span>
                            </div>
                        </Link>

                        {user.role === "ADMIN" && (
                            <Link to="/exercise-creator" className="acct-admin-btn-link">
                                <button className="acct-admin-btn" type="button">
                                    + {t('user_form.create_exercise')}
                                    <span className="acct-admin-tag">Admin</span>
                                </button>
                            </Link>
                        )}

                        {!workout.id ? (
                            <button
                                className="acct-primary-cta"
                                onClick={() => startWorkout()}
                                type="button"
                            >
                                🚀 {t('user_form.start_workout')}
                            </button>
                        ) : (
                            <div className="acct-active-workout-wrapper">
                                <ActiveWorkout />
                            </div>
                        )}

                        <p className="acct-section-label">{t('user_form.title_profile')}</p>
                        <div className="acct-card">
                            <div className="acct-stat-row">
                                <span className="acct-stat-label">{t('user_form.age')}</span>
                                <span className="acct-stat-value">{user.age || '—'} {t('user_form.years')}</span>
                            </div>
                            <div className="acct-stat-row">
                                <span className="acct-stat-label">{t('user_form.gender')}</span>
                                <span className="acct-stat-value">{t(`database.genders.${user.gender}`) || '—'}</span>
                            </div>
                            <div className="acct-stat-row">
                                <span className="acct-stat-label">{t('user_form.height')}</span>
                                <span className="acct-stat-value">{user.height || '—'} {t('user_form.cm')}</span>
                            </div>
                            <div className="acct-stat-row">
                                <span className="acct-stat-label">{t('user_form.weight')}</span>
                                <span className="acct-stat-value">{user.weight || '—'} {t('user_form.kg')}</span>
                            </div>
                            <div className="acct-stat-row">
                                <span className="acct-stat-label">{t('user_form.goal')}</span>
                                <span className="acct-stat-value acct-goal-value">{t(`database.goals.${user.goal}`) || '—'}</span>
                            </div>
                        </div>

                        <p className="acct-section-label">{t('user_form.soreness_title', { defaultValue: 'Втома по групах м\'язів' })}</p>
                        <div className="acct-card">
                            <MuscleBodyMap
                                soreness={MOCK_SORENESS}
                                getColor={getSorenessColorVar}
                                frontLabel={t('user_form.view_front', { defaultValue: 'Спереду' })}
                                backLabel={t('user_form.view_back', { defaultValue: 'Ззаду' })}
                            />

                            <div className="acct-heatmap-legend">
                                <span className="acct-legend-item">
                                    <span className="acct-legend-dot" style={{ background: "var(--acct-fresh)" }} />
                                    {t('user_form.soreness_fresh', { defaultValue: 'Свіжі' })}
                                </span>
                                <span className="acct-legend-item">
                                    <span className="acct-legend-dot" style={{ background: "var(--acct-moderate)" }} />
                                    {t('user_form.soreness_moderate', { defaultValue: 'Помірна' })}
                                </span>
                                <span className="acct-legend-item">
                                    <span className="acct-legend-dot" style={{ background: "var(--acct-sore)" }} />
                                    {t('user_form.soreness_high', { defaultValue: 'Сильна' })}
                                </span>
                            </div>
                            <p className="acct-mock-note">{t('user_form.mock_data_note', { defaultValue: 'Демо-дані' })}</p>
                        </div>

                        <p className="acct-section-label">{t('user_form.proficiency_title', { defaultValue: 'Прогрес' })}</p>
                        <div className="acct-card">
                            {proficiencyGroups.length === 0 ? (
                                <p className="acct-stat-label">{t('user_form.loading', { defaultValue: 'Завантаження...' })}</p>
                            ) : (
                                proficiencyGroups.map((group: any) => (
                                    <div className="acct-progress-item" key={group.id}>
                                        <div className="acct-progress-top">
                                            <span>{group.name}</span>
                                            <span>{group.value}%</span>
                                        </div>
                                        <div className="acct-progress-track">
                                            <div className="acct-progress-fill" style={{ width: `${group.value}%` }} />
                                        </div>
                                    </div>
                                ))
                            )}
                            <p className="acct-mock-note">{t('user_form.mock_data_note', { defaultValue: 'Демо-дані' })}</p>
                        </div>

                        <Link to="/history" className="acct-ghost-btn-link">
                            <div className="acct-card acct-history-row">
                                <div>
                                    <p className="acct-history-title">📊 {t('user_form.workout_history')}</p>
                                    <p className="acct-history-subtitle">{t('user_form.view_all_workouts', { defaultValue: 'Переглянути всі тренування' })}</p>
                                </div>
                                <span className="acct-chevron">›</span>
                            </div>
                        </Link>

                        <Link to="/editProfile" className="acct-ghost-btn-link">
                            <button className="acct-ghost-btn" type="button">
                                {t('user_form.edit_profile')}
                            </button>
                        </Link>

                        <div className="acct-logout-wrapper">
                            <LogoutButton />
                        </div>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Account;
