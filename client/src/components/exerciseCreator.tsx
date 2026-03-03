import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";

interface ExerciseData {
    name: string;
    group: string;
}

const muscleGroups = ["Chest", "Triceps", "Back", "Biceps", "Legs", "Shoulders", "Core"];

function ExerciseCreator() {
    const [exerciseData, setExerciseData] = useState<ExerciseData>({
        name: '',
        group: muscleGroups[0],
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(exerciseData);
    };
    const { getAccessTokenSilently } = useAuth0();

    return (
        <div className="p-3">
            <h2 className="mb-4 text-light" >New Exercise</h2>
            <Form onSubmit={handleSubmit} className="bg-secondary bg-opacity-10 p-4 rounded-4">
                <FloatingLabel label="Exercise Name" className="mb-3 text-dark">
                    <Form.Control type="text" placeholder="Bench press" value={exerciseData.name} onChange={(e) => setExerciseData({...exerciseData, name: e.target.value})} />
                </FloatingLabel>

                <Form.Group className="mb-3">
                    <Form.Label className="text-light fs-5">Muscle Group</Form.Label>
                    <Form.Select className="py-3 rounded-3 " value={exerciseData.group} onChange={(e) => setExerciseData({...exerciseData, group: e.target.value})}>
                        {muscleGroups.map(group => (
                            <option key={group}>{group}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" className="w-100 py-3 rounded-3" onClick={async () => {
                    try {
                        const response = await axios.post(import.meta.env.VITE_API_URL+"/exercise", exerciseData, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${await getAccessTokenSilently()}`
                            },
                        });
                        console.log("Exercise created:", response.data);
                    } catch (error) {
                        console.error("Error creating exercise:", error);
                    }
                }}>Add Exercise</Button>
            </Form>
        </div>
    );
}

export default ExerciseCreator;