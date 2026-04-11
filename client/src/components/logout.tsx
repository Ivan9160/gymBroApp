import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { t} = useTranslation();
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } 
    });
    localStorage.clear();
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-red-600 transition-all duration-200"
    >
      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      {t('nav.logout')}
    </button>
  );
};

export default LogoutButton;