import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

interface ExerciseData {
    name: string;
    note: string;
    group: string;
    weight: number;
    reps: number;
}

function ExerciseCreator() {
    const [exerciseData, setExerciseData] = useState<ExerciseData>({
        name: '',
        note: '',
        group: 'Strength',
        weight: 0,
        reps: 0
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(exerciseData);
    };

    return (
        <div className="p-3">
            <h2 className="mb-4">New Exercise</h2>
            <Form onSubmit={handleSubmit} className="bg-secondary bg-opacity-10 p-4 rounded-4">
                <FloatingLabel label="Exercise Name" className="mb-3 text-dark">
                    <Form.Control type="text" placeholder="Squats" />
                </FloatingLabel>

                <Form.Group className="mb-3">
                    <Form.Label>Muscle Group</Form.Label>
                    <Form.Select className="py-3 rounded-3">
                        <option>Strength</option>
                        <option>Cardio</option>
                        <option>Flexibility</option>
                    </Form.Select>
                </Form.Group>

                <div className="d-flex gap-3 mb-4">
                    <FloatingLabel label="Weight (kg)" className="w-100 text-dark">
                        <Form.Control type="number" />
                    </FloatingLabel>
                    <FloatingLabel label="Reps" className="w-100 text-dark">
                        <Form.Control type="number" />
                    </FloatingLabel>
                </div>

                <Button type="submit" className="w-100 py-3 rounded-3">Add Exercise</Button>
            </Form>
        </div>
    );
}

export default ExerciseCreator;