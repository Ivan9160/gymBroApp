import { Badge, Card} from "react-bootstrap";
import type { Exercise, ExerciseGroup, Set } from "../../../types";
import { Exercise as RenderedExercise } from "./exercise";
import { useTranslation } from "react-i18next";

interface groupProps  {
    groupIndex: number;
    group: ExerciseGroup;
    groupSets: any[];
    currentGroupExercises: Exercise[];
}

export function Group( {group, groupIndex, groupSets, currentGroupExercises}: groupProps ) {
    const {t} = useTranslation();
    return (
        <Card key={group.id} className="mb-3 p-0 border-0 shadow-lg rounded-4 bg-white">
            <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-bold text-primary">
                    <span className="text-muted me-2">{groupIndex + 1}.</span>
                    {t(`database.exercise_groups.${group.name}`)}
                </h5>
                <Badge bg="light" className="text-primary rounded-pill">
                    {groupSets.length !== 1 ? `${groupSets.length} sets` : '1 set'}
                </Badge>
            </div>

            {currentGroupExercises.map((exercise: Exercise, exerciseIndex: number) => {
                const currentExerciseSets = groupSets.filter((s: Set) => s.exerciseId === exercise.id);
                const exerciseName = currentExerciseSets[0]?.exercise?.name;

                return (
                    <RenderedExercise 
                        key={exercise.id || exerciseIndex} 
                        exerciseIndex={exerciseIndex} 
                        exerciseName={exerciseName} 
                        currentExerciseSets={currentExerciseSets} 
                    />
                );
            })}
        </Card.Body>
        </Card>
    );
}