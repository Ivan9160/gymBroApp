import { Link, useLocation } from "react-router-dom";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import { ArrowLeft, Calendar, Clock, Activity } from "react-bootstrap-icons"; 
import type { ExerciseGroup, Set } from "../../../types";
import { useGetExerciseGroupsQuery, useGetExercisesQuery } from "../../../api/exerciseApi";
import { Group } from "./group";
import { useTranslation } from "react-i18next";


function WorkoutDetails() {
    const location = useLocation();
    const workout = location.state?.workout;
    const {data: exercises} = useGetExercisesQuery() || [];
    const {data: exerciseGroups} = useGetExerciseGroupsQuery() || [];

    const {t, i18n} = useTranslation();
    const currentWorkoutGroups = exerciseGroups?.filter(
        group => workout.sets.some(
            (set: Set) => exercises?.find(
                ex => ex.id === set.exerciseId)?.exerciseGroupId === group.id
        )
    );
    const currentWorkoutExercises = exercises?.filter(ex => workout.sets.some((set: Set) => set.exerciseId === ex.id)) || [];
    const formatTime = (startDate: Date, endDate: Date) => {
        const totalSeconds = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('uk-UA', {
            day: 'numeric', month: 'long', year: 'numeric'
        });
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={10} lg={8}>
                    <Link to="/history" className="text-decoration-none mb-3 d-inline-block text-primary fw-bold">
                        <ArrowLeft className="me-2" /> {t('workout_history.back_to_history')}
                    </Link>

                    <Card className="shadow-lg border-0 rounded-4 overflow-hidden mb-4">
                        <Card.Header className="bg-primary text-white p-4 border-0">
                            <Row className="align-items-center">
                                <Col>
                                    <h2 className="mb-1 fw-bold">{workout.name || "Workout Session"}</h2>
                                    <div className="d-flex align-items-center opacity-75">
                                        <Calendar className="me-2" />
                                        <span>{formatDate(workout.createdAt)}</span>
                                    </div>
                                </Col>
                                <Col xs="auto" className="text-end">
                                    <Badge bg="light" text="dark" className="rounded-pill px-3 py-2">
                                        {t('workout_history.completed')}
                                    </Badge>
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body className="bg-light py-3 border-bottom">
                            <Row className="text-center">
                                <Col>
                                    <div className="text-muted small uppercase fw-bold">{t('workout_history.duration')}</div>
                                    <div className="fw-bold h5 mb-0"><Clock className="me-1 text-primary"/> {formatTime(new Date(workout.createdAt), new Date(workout.finishedAt))}</div>
                                </Col>
                                <Col className="border-start border-end">
                                    <div className="text-muted small uppercase fw-bold">{t('workout_history.exercises')}</div>
                                    <div className="fw-bold h5 mb-0"><Activity className="me-1 text-primary"/> {workout.sets.length}</div>
                                </Col>
                                <Col>
                                    <div className="text-muted small uppercase fw-bold">{t('workout_history.total_volume')}</div>
                                    <div className="fw-bold h5 mb-0 text-success">{workout.sets.length} {t('workout_history.sets')}</div>
                                </Col>
                            </Row>
                        </Card.Body>

                        <Card.Body className="p-4">
                            <h4 className="mb-4 fw-bold">{t('workout_history.exercises_summary')}</h4>
                            
                            {currentWorkoutGroups?.map((group: ExerciseGroup, groupIndex: number) => {
                                const currentGroupExercises = currentWorkoutExercises?.filter(ex => ex.exerciseGroupId === group.id) || [];
                                const groupSets = workout.sets.filter((set: Set) => currentGroupExercises.some(ex => ex.id === set.exerciseId));
                                
                                return Group(group, groupIndex, groupSets, currentGroupExercises);
                            })}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default WorkoutDetails;