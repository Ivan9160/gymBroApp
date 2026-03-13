import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, FloatingLabel, Stack, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    setUserId,
    setUserRole,
    setUserName,
    setUserAuth0Id,
    setUserAge,
    setUserGender,
    setUserHeight,
    setUserWeight,
    setUserGoal
} from '../store/slices/userSlice';


export function UserDataForm({ status }: { status: string }) {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    const reduxUser = useSelector((state: any) => state.user);
    const [dbLoading, setdbLoading] = useState(true);
    const API_URL = import.meta.env.VITE_API_URL;

    const handleNameChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserName(e.target.value));
    const handleAgeChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserAge(Number(e.target.value) || null));
    const handleGenderChange = (val: 'female' | 'male') => dispatch(setUserGender(val));
    const handleHeightChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserHeight(Number(e.target.value) || null));
    const handleWeightChange = (e: React.FocusEvent<HTMLInputElement>) => dispatch(setUserWeight(Number(e.target.value) || null));
    const handleGoalChange = (val: 'lose' | 'maintain' | 'gain') => dispatch(setUserGoal(val as any));
        
    useEffect(() => {
        const fetchData = async () => {
            
        if (isAuthenticated && reduxUser.id == null) {
            try {
            const fullUrl = `${API_URL}/user/${user?.sub}`;
            const token =  await getAccessTokenSilently();
            setdbLoading(true);
            const response = await axios.get(fullUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
                if (response.data) {
                setdbLoading(false);
                const userData = response.data;
                dispatch(setUserId(userData.id));
                dispatch(setUserRole(userData.role));
                dispatch(setUserName(userData.name));
                dispatch(setUserAuth0Id(userData.auth0Id));
                dispatch(setUserAge(userData.userProfile.age));
                dispatch(setUserGender(userData.userProfile.gender));
                dispatch(setUserHeight(userData.userProfile.height));
                dispatch(setUserWeight(userData.userProfile.weight));
                dispatch(setUserGoal(userData.userProfile.goal));
                console.log("User data loaded into Redux:", userData);
                navigate('/account');
                }
                else {
                setdbLoading(false);
                }
                
            

            console.log("Server response:", response.data);
            } catch (error) {
            console.error("Request error:", error);
            }
        }
        };

    fetchData();
  }, [isAuthenticated]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isLoading || !isAuthenticated || !user) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            
            const method = reduxUser.id == null ? 'POST' : 'PUT';
            const requestPath = reduxUser.id == null ? '/user' : `/user/${reduxUser.id}`;
            const token =  await getAccessTokenSilently();
            const requestData = { 
                ...reduxUser, 
                auth0Id: user.sub 
            };
            console.log('Submitting user data:', requestData);
            const response = await fetch(`${API_URL}${requestPath}`, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setUserId(data.id));
                console.log('User data saved successfully:', data);
                navigate('/account');
            }
        } catch (error) {
            console.error(error);
        }
    };
    if (dbLoading&& !reduxUser.id) {
        return <div className="bg-dark vh-100 text-white d-flex justify-content-center align-items-center">Loading...</div>;
    }
    return (
    <Form className="w-100 mx-auto min-h-screen" style={{ maxWidth: "500px" }} onSubmit={handleSubmit}>
        <div className="bg-secondary bg-opacity-10 p-4 rounded-4 mb-4">
            <FloatingLabel label="Name" className="mb-3 text-dark">
                <Form.Control defaultValue={reduxUser.name || ''} onBlur={handleNameChange} required />
            </FloatingLabel>
            <FloatingLabel label="Age" className="mb-3 text-dark">
                <Form.Control type="number" defaultValue={reduxUser.age || ''} onBlur={handleAgeChange} required />
            </FloatingLabel>
        </div>

        <div className="bg-secondary bg-opacity-10 p-4 rounded-4 mb-4 text-gray-100">
            <Form.Label>Gender</Form.Label>
            <ButtonGroup className="w-100 mb-4">
                <Button 
                    variant={reduxUser.gender === 'male' ? 'primary' : 'outline-primary'} 
                    onClick={() => handleGenderChange('male')}
                >
                    Male
                </Button>
                <Button 
                    variant={reduxUser.gender === 'female' ? 'primary' : 'outline-primary'} 
                    onClick={() => handleGenderChange('female')}
                >
                    Female
                </Button>
            </ButtonGroup>
            
            <Row>
                <Col>
                    <FloatingLabel label="Height (cm)" className="text-dark">
                        <Form.Control type="number" defaultValue={reduxUser.height || ''} onBlur={handleHeightChange} required />
                    </FloatingLabel>
                </Col>
                <Col>
                    <FloatingLabel label="Weight (kg)" className="text-dark">
                        <Form.Control type="number" defaultValue={reduxUser.weight || ''} onBlur={handleWeightChange} required />
                    </FloatingLabel>
                </Col>
            </Row>
        </div>

        <div className="bg-secondary bg-opacity-10 p-4 rounded-4 mb-4 text-center text-gray-100">
            <Form.Label className="d-block text-start">Goal</Form.Label>
            <Stack gap={2}>
                {['lose', 'maintain', 'gain'].map((g) => (
                    <Button 
                        key={g} 
                        variant={reduxUser.goal === g ? 'primary' : 'outline-light'} 
                        onClick={() => handleGoalChange(g as any)}
                    >
                        {g.charAt(0).toUpperCase() + g.slice(1)} weight
                    </Button>
                ))}
            </Stack>
        </div>

        <Button type="submit" size="lg" className="w-100 rounded-pill py-3">
            {reduxUser.id == null ? 'Create Profile' : 'Update Profile'}
        </Button>
    </Form>
);
    
}