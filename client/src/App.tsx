import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Container, Nav, NavDropdown } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import LoginMenu from './components/login';
import Logout from './components/logout';
import { UserDataForm } from './components/userDataForm.tsx';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; 

function App() {
  const { isAuthenticated } = useAuth0();
  const reduxUser = useSelector((state: any) => state.user);
  const { t, i18n } = useTranslation(); 

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="d-flex bg-dark flex-column justify-content-start h-[100vh] mt-0 mb-0 pb-0">
      <header className="w-100 mt-0 p-0 border-bottom border-secondary">
        <Container className="d-flex justify-content-between align-items-center py-2">
          <Nav className="flex-grow-1">
            {reduxUser.id ? (
              <Nav.Link as={Link} to="/account" className="text-white text-xl">
                {t('nav.account')}
              </Nav.Link>
            ) : (
              isAuthenticated ? <Logout /> : <LoginMenu />
            )}
          </Nav>

          
          <Nav>
            <NavDropdown 
              title={i18n.language.toUpperCase()} 
              id="language-dropdown" 
              align="end"
              className="custom-dropdown"
            >
              <NavDropdown.Item onClick={() => changeLanguage('en')}>
                🇺🇸 English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage('ua')}>
                🇺🇦 Українська
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </header>

      <main className='bg-dark'>
        <Outlet />
        
        {reduxUser.id != null ? (
          <div className="text-center text-white mt-5 mb-4">
            {t('app.authenticated_user', { name: reduxUser?.name })}
          </div>
        ) : ( 
          isAuthenticated && !reduxUser.id ? (
            <UserDataForm status='existing' />
          ) : (
            <div className="text-center text-white mt-2 mb-4">
              {t('app.login_prompt')}
            </div>
          )
        )}
      </main>
    </div>
  );
}

export default App;