import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Stack, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import {
    setUserName,
    setUserAge,
    setUserGender,
    setUserHeight,
    setUserWeight,
    setUserGoal
} from '../store/slices/userSlice';
import { useGetUserSummaryQuery, useCreateUserMutation, useUpdateUserMutation } from '../api/userApi';
import { useTranslation } from 'react-i18next';


export function UserDataForm({}: { status: string }) {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const location = useLocation();

    const reduxUser = useSelector((state: any) => state.user);

    const [tokenReady, setTokenReady] = useState(false);

    useEffect(() => {
        const prepareToken = async () => {
            if (isAuthenticated) {
                const token = await getAccessTokenSilently();
                localStorage.setItem('token', token);
                setTokenReady(true);
            }
        };
        prepareToken();
    }, [isAuthenticated, getAccessTokenSilently]);

    const { isLoading: isSummaryLoading, isSuccess: isSummarySuccess } = useGetUserSummaryQuery(
        undefined,
        { skip: !isAuthenticated || !tokenReady }
    );


    const [createUser] = useCreateUserMutation();
    const [updateUser] = useUpdateUserMutation();

 
    useEffect(() => {
        console.log(isSummarySuccess, location.pathname);
        if (reduxUser.id != null && location.pathname === '/') {
            
            navigate('/account');
        }
    }, [reduxUser.id, location.pathname]);

    const handleNameChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserName(e.target.value));
    const handleAgeChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserAge(Number(e.target.value) || null));
    const handleGenderChange = (val: 'female' | 'male') => dispatch(setUserGender(val));
    const handleHeightChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserHeight(Number(e.target.value) || null));
    const handleWeightChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserWeight(Number(e.target.value) || null));
    const handleGoalChange = (val: 'lose' | 'maintain' | 'gain') => dispatch(setUserGoal(val as any));

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || !isAuthenticated || !user?.sub) return;

        const requestData  = {
            name: reduxUser.name,
            age: reduxUser.age,
            gender: reduxUser.gender,
            height: reduxUser.height,
            weight: reduxUser.weight,
            goal: reduxUser.goal,
            auth0Id: user.sub,
        };

        try {
            if (reduxUser.id == null) {
                await createUser(requestData).unwrap();
            } else {
                await updateUser(requestData).unwrap();
            }
            navigate('/account');
        } catch (error) {
            console.error(error);
        }
    };

    if (tokenReady && isSummaryLoading) {
        return <div className="bg-dark vh-100 text-white d-flex justify-content-center align-items-center">{t('user_form.loading')}</div>;
    }

    return (
    <Form className="w-100 mx-auto min-h-screen" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
        <div className="bg-secondary bg-opacity-10 p-4 rounded-4 mb-4">
            <FloatingLabel label={t('user_form.name')} className="mb-3 text-dark">
                <Form.Control defaultValue={reduxUser.name || ''} onBlur={handleNameChange} required />
            </FloatingLabel>
            <FloatingLabel label={t('user_form.age')} className="mb-3 text-dark">
                <Form.Control type="number" defaultValue={reduxUser.age || ''} onBlur={handleAgeChange} required />
            </FloatingLabel>
        </div>

        <div className="bg-secondary bg-opacity-10 p-4 rounded-4 mb-4 text-gray-100">
            <Form.Label>{t('user_form.gender')}</Form.Label>
            <ButtonGroup className="w-100 mb-4">
                <Button 
                    variant={reduxUser.gender === 'male' ? 'primary' : 'outline-primary'} 
                    onClick={() => handleGenderChange('male')}
                >
                    {t('user_form.male')}
                </Button>
                <Button 
                    variant={reduxUser.gender === 'female' ? 'primary' : 'outline-primary'} 
                    onClick={() => handleGenderChange('female')}
                >
                    {t('user_form.female')}
                </Button>
            </ButtonGroup>
            
            <Row>
                <Col>
                    <FloatingLabel label={t('user_form.height')} className="text-dark">
                        <Form.Control type="number" defaultValue={reduxUser.height || ''} onBlur={handleHeightChange} required />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel label={t('user_form.weight')} className="text-dark">
                        <Form.Control type="number" defaultValue={reduxUser.weight || ''} onBlur={handleWeightChange} required />
                    </FloatingLabel>
                </Col>
            </Row>
        </div>

        <div className="bg-secondary bg-opacity-10 p-4 rounded-4 mb-4 text-center text-gray-100">
            <Form.Label className="d-block text-start">{t('user_form.goal')}</Form.Label>
            <Stack gap={2}>
                {['lose', 'maintain', 'gain'].map((g) => (
                    <Button 
                        key={g} 
                        variant={reduxUser.goal === g ? 'primary' : 'outline-light'} 
                        onClick={() => handleGoalChange(g as any)}
                    >
                        {t(`user_form.goals.${g}`)}
                    </Button>
                ))}
            </Stack>
        </div>

        <Button type="submit" size="lg" className="w-100 rounded-pill py-3">
            {reduxUser.id == null ? t('user_form.title_create') : t('user_form.title_update')}
        </Button>
    </Form>
);
    
}