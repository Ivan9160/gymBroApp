import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState} from 'react';
import { Navbar, Nav, Container, Form, InputGroup, Stack, Button } from 'react-bootstrap';
import femalePhoto from './assets/fat-percentage-female.jpg'; 
import malePhoto from './assets/fat-percentage-male.jpg';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from './components/login';
import Logout from './components/logout';
import { useNavigate } from 'react-router-dom';


interface FormData {
  email: string;
  name: string;
  age: number | null;
  gender: 'female' | 'male' | null;
  height: number | null;
  weight: number | null;
  fatPercentage?: number | null;
  goal: 'lose' | 'maintain' | 'gain' | null;
}

function App() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="App">
      <header className="App-header">
      <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">GymBro App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <><LoginButton />
            <Logout /></>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </header>
      <main style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {isAuthenticated ? <CustomForm status='empty' /> : <div style={{marginTop: '20px', fontSize: '1.5em'}}>Please log in to access the form</div>}
      </main>

      <footer>
        <p>Footer content</p>
      </footer>
    </div>
  );

}

export default App

export function CustomForm({ }: { status: string }) {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(true);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name: '',
    age: null,
    gender: null,
    height: null,
    weight: null,
    fatPercentage: null,
    goal: null,
  });
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
  const fetchUserData = async () => {
    if (isAuthenticated && user) {
      setIsLoadingUser(true);
      try {
        // 👇 Запит на бек за конкретним користувачем по auth0Id
        const response = await fetch(`${API_URL}/user/${user.sub}`);

        if (response.ok) {
          const userDataFromApi = await response.json();
          setFormData(prev => ({
            ...prev,
            ...userDataFromApi,
            email: user.email || userDataFromApi.email || '',
            name: user.name || userDataFromApi.name || '',
          }));
          setIsNewUser(false);
        } else {
          console.log("User not found, new user flow");
          // Заповнюємо тільки email і name з Auth0
          setFormData(prev => ({
            ...prev,
            email: user.email || '',
            name: user.name || '',
          }));
          setIsNewUser(true);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        setIsNewUser(true);
      } finally {
        setIsLoadingUser(false);
      }
    }
  };

  fetchUserData();
}, [isAuthenticated, user]);


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: type === 'number' ? Number(value) || null : value,
    }));
  };
    const handleGenderChange = (selectedGender: 'female' | 'male') => {
      setFormData(prevData => ({
          ...prevData,
          gender: prevData.gender === selectedGender ? null : selectedGender, // знімаємо вибір, якщо клацнути двічі
      }));
  };

  const goals = [
    { id: 'lose', label: 'Lose weight', value: 'lose' },
    { id: 'maintain', label: 'Maintain weight', value: 'maintain' },
    { id: 'gain', label: 'Gain weight', value: 'gain' },
  ];

  const handleGoalChange = (goalValue: 'lose' | 'maintain' | 'gain') => {
    setFormData(prevData => ({
        ...prevData,
      goal: goalValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || !isAuthenticated || !user) {
      console.error('User not authenticated or still loading.');
      return;
    }
    const finalData = {
      ...formData,
      auth0Id: user.sub,
    };
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const apiUrl = API_URL+"/user"
      //     ? API_URL
      //     : `${user.sub}`;
          const method = isNewUser ? 'POST' : 'GET';

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
        
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Form submitted successfully:', data);
      navigate('/account/:' + user.sub);
    }
    catch (error) {
      console.error('Error submitting form:', error);
    }
    if (isLoading || !isAuthenticated) {
      return <div>Loading...</div>;
    }
  };

  if (isLoading || isLoadingUser) {
    return <div>Loading user data...</div>; // ⏳ поки чекаємо
  }

  if (!isNewUser) {
    return <div>Welcome back, {formData.name}!</div>; // 👈 замість форми
  }
  return (
    <Form className="p-3" style={{ maxWidth: "70em", display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={handleSubmit}>
    <InputGroup>
        <InputGroup.Text>Your name</InputGroup.Text>
        <Form.Control name="name" value={formData.name} onChange={handleChange} aria-label="First name" required/>
    </InputGroup>
    <InputGroup>
        <InputGroup.Text>Age</InputGroup.Text>
        <Form.Control name="age" type="number" value={formData.age || ''} onChange={handleChange} aria-label="Age" required/>
    </InputGroup>
    <InputGroup>
        <InputGroup.Text>email</InputGroup.Text>
        <Form.Control name="email" value={formData.email} onChange={handleChange} aria-label="Email" required/>
    </InputGroup>
    <InputGroup>
    <Stack direction="horizontal" gap={2}>
        <div className='d-flex' style={{gap: '5px'}}>
            <InputGroup.Text>female</InputGroup.Text>
            <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={() => handleGenderChange('female')}
                required
            />
        </div>
        <div className='d-flex' style={{gap: '5px'}}>
            <InputGroup.Text>male</InputGroup.Text>
            <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={() => handleGenderChange('male')}
                required
            />
        </div>
    </Stack>
</InputGroup>

    <InputGroup>
        <InputGroup.Text>Height</InputGroup.Text>
        <Form.Control name="height" type="number" value={formData.height || ''} onChange={handleChange} aria-label="Height" required/>
        <InputGroup.Text>cm</InputGroup.Text>
        <InputGroup.Text>Weight</InputGroup.Text>
        <Form.Control name="weight" type="number" value={formData.weight || ''} onChange={handleChange} aria-label="Weight" required/>
    </InputGroup>

    {formData.gender && (
        <div className="mt-3">
            {formData.gender === 'female' && (
                <>
                    <h3>You choosed female gender</h3>
                    <img src={femalePhoto} alt="Жінка" style={{ maxWidth: '69vw', height: '15em'}} />
                    <InputGroup className="mt-3">
                        <InputGroup.Text>Body Fat Percentage</InputGroup.Text>
                        <Form.Control name="fatPercentage" type="number" value={formData.fatPercentage || ''} onChange={handleChange} aria-label="Body Fat Percentage" />
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                </>
            )}
            {formData.gender === 'male' && (
                <>
                    <h3>You choosed male gender</h3>
                    <img src={malePhoto} alt="Чоловік" style={{ maxWidth: '100%', height: '15em' }} />
                    <InputGroup className="mt-3">
                        <InputGroup.Text>Body Fat Percentage</InputGroup.Text>
                        <Form.Control name="fatPercentage" type="number" value={formData.fatPercentage || ''} onChange={handleChange} aria-label="Body Fat Percentage" />
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                </>
            )}
        </div>
    )}
    
    <InputGroup style={{gap: '10px', flexWrap: 'wrap'
    }}>
        <InputGroup.Text>Weight Goal</InputGroup.Text>
        <div className="d-flex" style={{width: '50vw',margin: '10px', flexDirection: 'row',
    justifyContent: 'space-betwee' }}>
            {goals.map((goal) => (
                <Form.Check className='d-flex align-items-center' style={{ display:'flex' ,gap: '10px', marginRight: '10px' }}
                    key={goal.id}
                    type="radio"
                    name="goal"
                    label={goal.label}
                    value={goal.value}
                    checked={formData.goal === goal.value}
                    onChange={() => handleGoalChange(goal.value as 'lose' | 'maintain' | 'gain')}
                    required
                />
            ))}
        </div>
    </InputGroup>
    <Button type="submit">Submit</Button>
</Form>
  )
}


