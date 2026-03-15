
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Container, Nav } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import LoginMenu from './components/login';
import Logout from './components/logout';
import { UserDataForm } from './components/userDataForm.tsx';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const reduxUser = useSelector((state: any) => state.user);


  return (
    <div className="d-flex bg-dark flex-column  justify-content-start h-[100vh] mt-0 mb-0 pb-0">
      <header className="mx-auto mt-0 p-0   ">
        <Container className="d-flex !border-bottom-1 justify-content-center " >
          <Nav >
            {reduxUser.id ? (
              <Nav.Link as={Link} to="/account" className="text-white !text-xl  w-[20%]">Account</Nav.Link>
            ) : (
              isAuthenticated ? <Logout /> : <LoginMenu />
            )}
            
          </Nav>
        </Container>
      </header>
      <main className='bg-dark ' >
        <Outlet />
        {reduxUser.id !=null? (
          <div className="text-center text-white mt-5 mb-4">Authentificated user: {reduxUser?.name}</div>
          
        ) : ( isAuthenticated && !reduxUser.id ? (<UserDataForm status='existing' />): (
            <div className="text-center text-white mt-2 mb-4">Please log in to start training</div>
        )
          ) 
        
        
        }

      </main>
    </div>
  );
}

export default App;