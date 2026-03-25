import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Auth0Provider, type AppState } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import './index.css';
import router from './router.tsx';

const onRedirectCallback = (appState?: AppState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        }}
        cacheLocation="localstorage" 
        useRefreshTokens={true}     
        onRedirectCallback={onRedirectCallback}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);