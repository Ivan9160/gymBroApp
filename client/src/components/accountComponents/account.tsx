import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Card, Row, Col, ListGroup, Button} from "react-bootstrap";
import LogoutButton from "../logout";
import {useGetExercisesQuery, useGetExerciseGroupsQuery} from "../../api/exerciseApi"
import { setWorkoutId, setWorkoutStartTime} from "../../store/slices/workoutSlice";
import axios from "axios";
import ActiveWorkout from "./activeWorkout";
import { useTranslation } from "react-i18next";

function Account() {
    const user = useSelector((state: any) => state.user);
    const workout = useSelector((state: any) => state.workout);
    const dispatch = useDispatch();
    const { t} = useTranslation(); 

    useGetExercisesQuery();
    useGetExerciseGroupsQuery();
    const startWorkout = () => {
        axios.post(import.meta.env.VITE_API_URL+"/workouts", {
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

    return (
        <Container className="py-5 ">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-lg border-0 rounded-4 overflow-hidden mb-4">
                        <Card.Header className="bg-primary text-white text-center py-4">
                            <h2 className="mb-0">{t('user_form.title_profile')}</h2>
                        </Card.Header>
                        
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h3 className="fw-bold">{user.name}</h3>
                                <p className="text-muted">{user.email}</p>
                            </div>

                            <ListGroup variant="flush" className="mb-4">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">{t('user_form.age')}:</span>
                                    <span className="fw-bold">{user.age || '—'} {t('user_form.years')}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">{t('user_form.gender')}:</span>
                                    <span className="fw-bold ">{t(`database.genders.${user.gender}`) || '—'}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">{t('user_form.height')}:</span>
                                    <span className="fw-bold">{user.height || '—'} {t('user_form.cm')}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">{t('user_form.weight')}:</span>
                                    <span className="fw-bold">{user.weight || '—'} {t('user_form.kg')}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span className="text-secondary">{t('user_form.goal')}:</span>
                                    <span className="fw-bold text-success ">{t(`database.goals.${user.goal}`) || '—'}</span>
                                </ListGroup.Item>
                            </ListGroup>

                            <div className="d-grid gap-2">
                                <Link to="/history" className="text-decoration-none d-grid">
                                    <Button variant="primary" className="rounded-pill shadow-sm">
                                        📊 {t('user_form.workout_history')}
                                    </Button>
                                </Link>

                                {user.role === "ADMIN" && (
                                    <Link to="/exercise-creator" className="text-decoration-none d-grid mt-1">
                                        <Button variant="outline-primary" className="rounded-pill">
                                            + {t('user_form.create_exercise')}
                                        </Button>
                                    </Link>
                                )}

                                <Link to="/editProfile" className="text-decoration-none d-grid mt-1">
                                    <Button variant="outline-primary" className="rounded-pill">
                                        {t('user_form.edit_profile')}
                                    </Button>
                                </Link>
                                
                                <hr />
                                <LogoutButton />
                            </div>


                        </Card.Body>
                    </Card>

                    {!workout.id ? (
                        <Button 
                            variant="success" 
                            size="lg" 
                            className="w-100 rounded-4 py-3 shadow" 
                            onClick={() => startWorkout()}
                            type="button"
                        >
                            🚀 {t('user_form.start_workout')}
                        </Button>
                    ) : (
                        <ActiveWorkout />
                    )}
                </Col>
            </Row>
        </Container>
    );
}


export default Account;