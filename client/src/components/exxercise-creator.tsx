import { useState } from "react";
import { Form } from "react-bootstrap";

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
        group: 'Cardio',
        weight: 0,
        reps: 0
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExerciseData({
            ...exerciseData,
            [name]: value
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            console.log("Exercise Created:", exerciseData);
        };

  return (
    <div>
      <h1>Formatted Exercise Creator</h1>
      <p>This component will help you create formatted exercises.</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="exerciseName">
          <Form.Label>Exercise Name</Form.Label>
          <Form.Control type="text" placeholder="Enter exercise name" />
        </Form.Group>

        <Form.Group controlId="exerciseDescription">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter exercise note" />
        </Form.Group>

        <Form.Group controlId="exerciseGroup">
          <Form.Label>Group</Form.Label>
          <Form.Control as="select">
            <option>Cardio</option>
            <option>Strength</option>
            <option>Flexibility</option>
            <option>Balance</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exerciseWeight">
          <Form.Label>Weight</Form.Label>
          <Form.Control type="number" placeholder="Enter weight" />
        </Form.Group>

        <Form.Group controlId="exerciseReps">
            <Form.Label>Reps</Form.Label>
            <Form.Control type="number" placeholder="Enter number of reps" />
        </Form.Group>

        <button type="submit" className="btn btn-primary">Create Exercise</button>	
      </Form>
    </div>
  );
}

export default ExerciseCreator;