import { Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
interface ExerciseProps {
    exerciseIndex: number;
    exerciseName: string;
    currentExerciseSets: any[];
}

export function Exercise({exerciseIndex, exerciseName, currentExerciseSets}: ExerciseProps) {
    const {t} = useTranslation();
    return (
        <div key={exerciseIndex} className="mt-3">
            <h6 className="fw-bold text-dark mb-2">{t(`database.exercises.${exerciseName}`) || exerciseName}</h6>
            <Table hover borderless responsive className="mb-0 align-middle">
                        <thead className="text-muted small">
                            <tr>
                                <th style={{ width: '20%' }}>{t('workout_history.set')}</th>
                                <th>{t('workout_history.weight')}</th>
                                <th>{t('workout_history.reps')}</th>
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
                                        <span className="text-muted small"> {t('workout_history.kg')}</span>
                                    </div>
                                ) : (
                                    <span>{t('workout_history.bodyweight')}</span>
                                )}
                            </td>
                            <td>
                                {set.reps} <span className="text-muted small"> {t('workout_history.reps')}</span>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </Table>
        </div>
    );
}