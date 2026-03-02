```markdown
# 📱 GymBro Client Documentation

## 🏗 Architecture
The client is built with **Vite + React** and follows a modular structure.

### State Management (Redux Toolkit)
- `userSlice`: Manages the current user profile and loading states.
- `authSlice`: (Optional) Tracks authentication status.

## 🔄 Core Flows

### 1. Initial Load / Auth Sync
- User logs in via Auth0.
- App triggers `checkUserInDb` action.
- If user exists → Data is loaded into Redux.
- If user doesn't exist → Redirect to `/register` form.

### 2. Anti-Flicker Protection
We use `dbLoading` flag. 
While `dbLoading` is `true`, a loading spinner is shown **(TODO: implement)** instead of the login/register page to prevent UI "flickering".

## 📦 Components
- **App**: Handles Login/Logout via Auth0 `useAuth0` hook. 
- **UserDataForm**: Unified form for creating and editing profiles. Uses `axios` for API calls.
- **Router**: Central navigation configuration using createBrowserRouter to manage the app's route hierarchy, nested components, and page-specific props like status="existing" for profile editing.
- **PrivateRoute**: Prevents unauthorized access to dashboard. **(TODO: implement)**

## 🎨 Styling
- **Tailwind CSS**: Used for layout and spacing.
- **React-Bootstrap**: Used for complex UI elements like Modals and Tables.