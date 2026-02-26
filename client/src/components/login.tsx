import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginMenu = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="App flex min-h-screen rounded-xl items-center justify-center bg-gray-100 p-4">
      <div className="mx-auto w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">GymBro</h2> 
        <p className="text-gray-600 text-sm mb-8 font-medium">Elevate your training today</p>

          <button 
            onClick={() => loginWithRedirect()}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 shadow-md"
          >
            Log In
          </button>

          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="px-3 text-xs font-medium uppercase text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <button 
            onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Sign Up
          </button>

          <p className="mt-8 text-xs text-gray-400">
            By continuing, you agree to our Terms of Service.
          </p>
        </div>
      </div>
  );
};

export default LoginMenu;