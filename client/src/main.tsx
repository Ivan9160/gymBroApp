import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth0Provider, type AppState } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
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
        domain="dev-qx8ucycogsprxmxn.us.auth0.com"
        clientId="5pvtkb0JFkxfs8ZzTTmlrs48r5tawUX8"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        onRedirectCallback={onRedirectCallback}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);