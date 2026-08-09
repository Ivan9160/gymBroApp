import { useDispatch, useSelector } from "react-redux";
import {  Row, Col, Form } from "react-bootstrap";
import { useGetExercisesQuery, useGetExerciseGroupsQuery } from "../../../api/exerciseApi";
import { setWorkoutId, setWorkoutStartTime, setWorkoutSets } from "../../../store/slices/workoutSlice";
import { setSetExerciseId, setSetMuscleGroup, setSetWeight, setSetReps } from "../../../store/slices/setSlice";
import { WorkoutTimer } from "./workoutTimer";
import type { ISet } from "../../../types";
import axios from "axios";
import { useState } from "react";
import { FinishWorkoutModal } from "./finishWorkoutModal";
import { SwipeableSetItem } from "./swipeableSetItem";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const inputStyle = {
    background: "var(--acct-card-alt)",
    color: "var(--acct-text)",
    border: "1px solid var(--acct-border)",
    borderRadius: "12px",
    padding: "10px"
};

const labelStyle = {
    color: "var(--acct-text-secondary)",
    fontSize: "14px",
    marginBottom: "6px"
};

function ActiveWorkout() {
    const set = useSelector((state: any) => state.set);
    const workout = useSelector((state: any) => state.workout);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data: exercises } = useGetExercisesQuery();
    const { data: exerciseGroups } = useGetExerciseGroupsQuery();

    const [showConfirmFinishWorkout, setShowConfirmFinishWorkout] = useState(false);

    const handleAddSet = () => {
        if (isSetValid()) {
            axios.post(import.meta.env.VITE_API_URL+"/sets", {
                exerciseId: set.exerciseId,
                weight: set.weight,
                reps: set.reps,
                workoutId: workout.id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then(response => {
                const createdSet: ISet = response.data;
                const newSets = [...workout.sets, createdSet];
                dispatch(setWorkoutSets(newSets));
                dispatch(setSetWeight(0));
                dispatch(setSetReps(null));
            }).catch(error => {               
                 console.error("Error adding set:", error);
            });
        }
    };

    const handleDeleteSet = async (setId: number) => {
        try {
            const updatedSets = workout.sets.filter((s: ISet) => s.id !== setId)
            dispatch(setWorkoutSets(updatedSets));
            await axios.delete(import.meta.env.VITE_API_URL+`/sets/${+setId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            
        } catch (error) {
            console.error("Error deleting set:", error);
        }
    };

    const isSetValid = () => {
        return (set.exerciseId && set.muscleGroupId  && set.reps && exercises?.find(e => e.id === set.exerciseId)?.isBodyweight)       
        || (set.exerciseId && set.muscleGroupId  && set.reps && set.weight);
    };

    const finishWorkout = () => {
        axios.put(import.meta.env.VITE_API_URL+`/workouts/${workout.id}`, {
            status: "COMPLETED",
            finishedAt: new Date().toISOString()
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }).then(() => {
            dispatch(setWorkoutId(null));
            dispatch(setWorkoutStartTime(null));
            dispatch(setWorkoutSets([]));
            setShowConfirmFinishWorkout(false);
            window.location.reload();
        }).catch(error => {
            console.error("Error finishing workout:", error);
        });
    };

    const setExerciseGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSetMuscleGroup(Number(e.target.value)));
        dispatch(setSetExerciseId(exercises?.find(ex => ex.exerciseGroupId === Number(e.target.value))?.id || null));
    };

    return (
        <div className="acct-card" style={{ padding: "20px" }}>
            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3" style={{ borderColor: "var(--acct-border) !important" }}>
                <h4 className="mb-0" style={{ color: "var(--acct-text)", fontWeight: 600 }}>{t('active_workout.title')}</h4>
                <WorkoutTimer />
            </div>
            
            <Form className="mb-4">
                <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>{t('active_workout.form.exercise_label')}</Form.Label>
                    <Form.Select 
                        style={inputStyle}
                        value={set.muscleGroupId || 1}
                        onChange={setExerciseGroup}
                    >
                        {exerciseGroups?.map(group => (
                            <option key={group.id} value={group.id}>{t(`database.exercise_groups.${group.name}`)}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>{t('active_workout.form.exercise_label')}</Form.Label>
                    <Form.Select 
                        style={inputStyle}
                        disabled={!set.muscleGroupId}
                        value={set.exerciseId || 1}
                        onChange={(e) => dispatch(setSetExerciseId(Number(e.target.value)))}
                    >
                        {exercises?.map(exercise => (
                            exercise.exerciseGroupId === set.muscleGroupId ?
                            <option key={exercise.id} value={exercise.id}>{t(`database.exercises.${exercise.name}`) || exercise.name}</option>
                            : null
                        ))}
                    </Form.Select>
                </Form.Group>

                <Row>
                    <Col>
                        <Form.Label style={labelStyle}>{t('active_workout.form.weight_label')}</Form.Label>
                        {exercises?.find(e => e.id === set.exerciseId)?.isBodyweight ? (
                            <Form.Control 
                                style={inputStyle}
                                type="number"
                                placeholder={t('active_workout.form.weight_placeholder')}
                                value={set.weight === 0 ? '' : set.weight}
                                onChange={(e) => dispatch(setSetWeight(Number(e.target.value)))}
                            />
                        ) : (
                            <Form.Control 
                                style={inputStyle}
                                type="number" 
                                placeholder={t('active_workout.form.reps_placeholder')}
                                value={set.weight === 0 ? '' : set.weight}
                                onChange={(e) => dispatch(setSetWeight(Number(e.target.value)))}
                            />
                        )}
                    </Col>
                    <Col>
                        <Form.Label style={labelStyle}>{t('active_workout.form.reps_label')}</Form.Label>
                        <Form.Control 
                            style={inputStyle}
                            type="number" 
                            placeholder="0"
                            value={set.reps === null ? '' : set.reps}
                            onChange={(e) => dispatch(setSetReps(Number(e.target.value)))}
                        />
                    </Col>
                </Row>
                
                <button 
                    className="acct-primary-cta mt-4"
                    onClick={handleAddSet}
                    type="button"
                    disabled={!isSetValid()}
                    style={{ opacity: !isSetValid() ? 0.5 : 1, width: '100%', marginBottom: 0 }}
                >
                    {t('active_workout.form.add_set_button')}
                </button>
            </Form>

            {workout.sets.length > 0 && (
                <div className="mt-4">  
                    <h6 className="mb-3" style={{ color: "var(--acct-text)" }}>{t('active_workout.current_sets')}</h6>
                    <AnimatePresence initial={false}>
                        {workout.sets.map((s: ISet, idx: number) => (
                        <motion.div
                            key={s.id}
                            initial={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <SwipeableSetItem
                            set={s}
                            exerciseName={exercises?.find(e => e.id === s.exerciseId)?.name}
                            setNumber={idx + 1}
                            onDelete={handleDeleteSet}
                            />
                        </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <div className="d-flex gap-2 mt-4">
                <button 
                    className="acct-ghost-btn" 
                    type="button" 
                    style={{ borderColor: "var(--acct-fresh)", color: "var(--acct-fresh)" }}
                    onClick={() => setShowConfirmFinishWorkout(true)}
                >
                    {t('active_workout.finish_btn')}
                </button>
            </div>
            
            <FinishWorkoutModal
                show={showConfirmFinishWorkout}
                onHide={() => setShowConfirmFinishWorkout(false)}
                onConfirm={finishWorkout}
            />
        </div>
    );
}

export default ActiveWorkout;