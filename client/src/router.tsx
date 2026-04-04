import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ExerciseCreator from "./components/exerciseCreator";
import { UserDataForm } from "./components/userDataForm";
import Account from "./components/accountComponents/account";
import WorkoutHistory from "./components/workoutHistoryComponents/workoutHistory";
import WorkoutDetails from "./components/workoutHistoryComponents/workoutReviewComponents/workoutDetails";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      
      {
        path: 'account',
        element: <Account />,
        
      },
      {
            path: 'exercise-creator',
            element: <ExerciseCreator />,
          },
      {
        path: 'editProfile',
        element: <UserDataForm status="existing" />,
      },
      {
        path: 'history',
        element: <WorkoutHistory />,
      },
      {
        path: 'history/review',
        element: <WorkoutDetails />,
      },
    ],
  },
]);
export default router;