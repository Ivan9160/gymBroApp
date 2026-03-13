import { useDispatch, useSelector } from "react-redux";
import { Container, Card, Row, Col, ListGroup, Button, Form } from "react-bootstrap";
import {useGetExercisesQuery, useGetExerciseGroupsQuery} from "../api/exerciseApi"
import { setWorkoutId, setWorkoutStartTime, setWorkoutSets } from "../store/slices/workoutSlice";
import { setSetExerciseId, setSetMuscleGroup, setSetWeight, setSetReps } from "../store/slices/setSlice";
import {WorkoutTimer} from "./workoutTimer";
import type { Set } from "../types";
import axios from "axios";

function ActiveWorkout() {
    const set = useSelector((state: any) => state.set);
    const workout = useSelector((state: any) => state.workout);
    const dispatch = useDispatch();

    const { data: exercises } = useGetExercisesQuery();
    const { data: exerciseGroups } = useGetExerciseGroupsQuery();
    console.log(exercises, exerciseGroups);
    const handleAddSet = () => {
        if (set.exerciseId && set.muscleGroupId  && set.reps) {
            axios.post(import.meta.env.VITE_API_URL+"/set", {
                exerciseId: set.exerciseId,
                weight: set.weight,
                reps: set.reps,
                workoutId: workout.id
            }).then(response => {
                const createdSet: Set = response.data;
                const newSets = [...workout.sets, createdSet];
                dispatch(setWorkoutSets(newSets));
                dispatch(setSetExerciseId(1));
                dispatch(setSetMuscleGroup(1));
                dispatch(setSetWeight(0));
                dispatch(setSetReps(null));
            }
            ).catch(error => {               
                 console.error("Error adding set:", error);
            } );
        }
    };
    const finishWorkout = () => {
        axios.put(import.meta.env.VITE_API_URL+`/workout/${workout.id}`, {
            status: "COMPLETED",
            finishedAt: new Date().toISOString()
        }).then(response => {
            dispatch(setWorkoutId(null));
            dispatch(setWorkoutStartTime(null));
            dispatch(setWorkoutSets([]));
        }).catch(error => {
            console.error("Error finishing workout:", error);
        });
    };

    const setExerciseGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSetMuscleGroup(Number(e.target.value)));
        dispatch(setSetExerciseId(exercises?.find(ex => ex.exerciseGroupId === Number(e.target.value))?.id || null));
    };

    return (
        <Container className="py-5 ">
            <Card className="shadow-lg border-0 rounded-4">
                <Card.Header className="bg-dark text-white py-3">
                    <h4 className="mb-0">Active Workout</h4>
                    <WorkoutTimer />
                </Card.Header>
                <Card.Body>
                    <Form className="mb-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Muscle Group</Form.Label>
                            <Form.Select 
                                value={set.muscleGroupId || 1}
                                onChange={setExerciseGroup}
                            >
                                {exerciseGroups?.map(group => (
                                    <option key={group.id} value={group.id}>{group.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Exercise</Form.Label>
                            <Form.Select 
                                disabled={!set.muscleGroupId}
                                value={set.exerciseId || 1}
                                onChange={(e) => dispatch(setSetExerciseId(Number(e.target.value)))}
                            >
                                {exercises?.map(exercise => (
                                    exercise.exerciseGroupId === set.muscleGroupId ?
                                    <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
                                    : null
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Row>
                            <Col>
                                <Form.Label>Weight (kg)</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={set.weight || 0}
                                    onChange={(e) => dispatch(setSetWeight(Number(e.target.value)))}
                                />
                            </Col>
                            <Col>
                                <Form.Label>Reps</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={set.reps || 0}
                                    onChange={(e) => dispatch(setSetReps(Number(e.target.value)))}
                                />
                            </Col>
                        </Row>
                        <Button 
                            variant="primary" 
                            className="w-100 mt-3 rounded-pill"
                            onClick={handleAddSet}
                            type="button"
                            disabled={!set.exerciseId || !set.muscleGroupId || !set.reps}
                        >
                            Add Set
                        </Button>
                    </Form>

                    {workout.sets.length > 0 && (
                        <ListGroup className="mb-3 border-0">
                            {workout.sets.map((s: Set, idx: number) => (
                                <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center bg-light border-0 mb-2 rounded-3">
                                    <div>
                                        <small className="text-muted d-block">{s.exerciseGroupId}</small>
                                        <strong className="text-primary">{exercises?.[exercises.findIndex((e) => e.id === s.exerciseId)]?.name}</strong>
                                    </div>
                                    <span className="badge bg-primary rounded-pill">{s.weight===0 ? 'Bodyweight' : s.weight + ' kg'}  x {s.reps}</span>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                    <div className="d-flex gap-2 mt-4">
                        <Button variant="success" type="button" className="w-50" onClick={finishWorkout}>
                            Finish Workout
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}


export default ActiveWorkout;