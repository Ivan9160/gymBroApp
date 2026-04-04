import { Table } from "react-bootstrap";

export function Exercise(exerciseIndex: number, exerciseName: string, currentExerciseSets: any[]) {
    return (
        <div key={exerciseIndex} className="mt-3">
            <h6 className="fw-bold text-dark mb-2">{exerciseName}</h6>
            <Table hover borderless responsive className="mb-0 align-middle">
                        <thead className="text-muted small">
                            <tr>
                                <th style={{ width: '20%' }}>SET</th>
                                <th>WEIGHT</th>
                                <th>REPS</th>
                            </tr>
                        </thead>
                    <tbody>
                    {currentExerciseSets.map((set: any, setIndex: number) => (
                        
                        <tr key={set.id || setIndex} className="border-top">
                            <td className="fw-bold text-secondary">{setIndex + 1}</td>
                            <td>
                                {set.weight ? (
                                    <div>
                                        {set.weight}
                                        <span className="text-muted small"> kg</span>
                                    </div>
                                ) : (
                                    <span>Bodyweight</span>
                                )}
                            </td>
                            <td>
                                {set.reps} <span className="text-muted small">reps</span>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </Table>
        </div>
    );
}