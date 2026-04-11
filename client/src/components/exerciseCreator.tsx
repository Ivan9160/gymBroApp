import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import { useGetExerciseGroupsQuery } from "../api/exerciseApi";
import { useTranslation } from "react-i18next";

interface ExerciseData {
    name: string;
    groupId: number;
    isBodyweight: boolean;
}

function ExerciseCreator() {
    const { data: exerciseGroups } = useGetExerciseGroupsQuery();
    const { getAccessTokenSilently } = useAuth0();
    const { t } = useTranslation();       

    const [showSuccess, setShowSuccess] = useState(false);
    
    const [exerciseData, setExerciseData] = useState<ExerciseData>({
        name: '',
        groupId: 0,
        isBodyweight: false,
    });
    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    useEffect(() => {
        if (exerciseGroups && exerciseGroups.length > 0 && exerciseData.groupId === 0) {
            setExerciseData(prev => ({ ...prev, groupId: exerciseGroups[0].id }));
        }
    }, [exerciseGroups]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();
            await axios.post(`${import.meta.env.VITE_API_URL}/exercises`, exerciseData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
            setShowSuccess(true);
            setExerciseData({
                name: '',
                groupId: exerciseGroups?.[0]?.id || 1,
                isBodyweight: false,
            });
        } catch (error) {
            console.error("Error creating exercise:", error);
        }
    };

    return (
        <div className="p-3">
            <h2 className="mb-4 text-light">{t('exercise_creator.title')}</h2>
            {showSuccess && (
                <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
                    {t('exercise_creator.success', { name: exerciseData.name })}
                </Alert>
            )}
            <Form onSubmit={handleSubmit} className="bg-secondary bg-opacity-10 p-4 rounded-4">
                <FloatingLabel label={t('exercise_creator.name_label')} className="mb-3 text-dark">
                    <Form.Control 
                        type="text" 
                        placeholder={t('exercise_creator.name_placeholder')} 
                        value={exerciseData.name} 
                        onChange={(e) => setExerciseData({...exerciseData, name: e.target.value})} 
                        required
                    />
                </FloatingLabel>

                <Form.Group className="mb-3">
                    <Form.Label className="text-light fs-5">{t('exercise_creator.muscle_group')}</Form.Label>
                    <Form.Select 
                        className="py-3 rounded-3" 
                        value={exerciseData.groupId} 
                        onChange={(e) => setExerciseData({...exerciseData, groupId: parseInt(e.target.value)})}
                    >
                        {exerciseGroups?.map((group: any) => (
                            <option key={group.id} value={group.id}>{t(`database.exercise_groups.${group.name}`)}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Check 
                        type="checkbox"
                        id="bodyweight-checkbox"
                        label={t('exercise_creator.bodyweight')}
                        className="text-light fs-6"
                        checked={exerciseData.isBodyweight}
                        onChange={(e) => setExerciseData({...exerciseData, isBodyweight: e.target.checked})}
                    />
                </Form.Group>

                <Button type="submit" className="w-100 py-3 rounded-3">
                    {t('exercise_creator.submit')}
                </Button>
            </Form>
        </div>
    );
}

export default ExerciseCreator;