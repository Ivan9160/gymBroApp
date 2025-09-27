import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import App from './App.tsx'
import Account from './components/account.tsx'
import FormattedExerciseCreator from './components/exxercise-creator.tsx';

const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/account/:id', element: <Account />, loader: async ({ params }) => {
    // You can fetch user data here if needed
    return { id: params.id };
  }, children: [{path: 'exercise-creator', element: <FormattedExerciseCreator />}]}
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
    <Auth0Provider
    domain="dev-qx8ucycogsprxmxn.us.auth0.com"
    clientId="5pvtkb0JFkxfs8ZzTTmlrs48r5tawUX8"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <RouterProvider router={router}/>
  </Auth0Provider>,
  </StrictMode>,
)
