import { Badge, Card} from "react-bootstrap";
import type { Exercise, ExerciseGroup, Set } from "../../../types";
import { Exercise as renderedExercise } from "./exercise";

export function Group( group: ExerciseGroup, groupIndex: number, groupSets: any, currentGroupExercises: any[]) {
    return (
        <Card key={group.id} className="mb-3 p-0 border-0 shadow-lg rounded-4 bg-white">
            <Card.Body className="p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0 fw-bold text-primary">
                    <span className="text-muted me-2">{groupIndex + 1}.</span>
                    {group.name}
                </h5>
                <Badge bg="light" className="text-primary rounded-pill">
                    {groupSets.length !== 1 ? `${groupSets.length} sets` : '1 set'}
                </Badge>
            </div>

            {currentGroupExercises.map((exercise: Exercise, exerciseIndex: number) => {
                const currentExerciseSets = groupSets.filter((s: Set) => s.exerciseId === exercise.id);
                const exerciseName = currentExerciseSets[0]?.exercise?.name;

                return renderedExercise(exerciseIndex, exerciseName, currentExerciseSets);
            })}
        </Card.Body>
        </Card>
    );
}