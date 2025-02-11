import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import AuthProvider from './Providers/AuthProvider';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateAssignmentPage from './pages/CreateAssignmentPage';
import PrivateRoute from './Providers/PrivateRoute';
import AttemptedAssignment from './pages/AttemptedAssignment';
import AssignmentsPage from './pages/AssignmentPage';
import PendingAssignment from './pages/PendingAssignment';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import GiveMarks from './pages/GiveMarks';
import AssignmentCard from './pages/AssignmentCard';
import UpdateAssignmentPage from './pages/UpdateAssignmentPage';
import AssignmentDetails from './pages/AssignmentDetails';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
    element: <MainLayout></MainLayout>,
    children: [
      {
        path:'/',
        element: <Home></Home>
      },
     {
      path: '/login',
      element: <Login></Login>
     },
     {
      path: '/register',
      element: <Register></Register>
     },
     {
      path: '/createassignmentpage',
      element: <PrivateRoute><CreateAssignmentPage></CreateAssignmentPage></PrivateRoute>
     },
     
      {
        path: '/attemptedassignment',
        element: <PrivateRoute><AttemptedAssignment></AttemptedAssignment></PrivateRoute>
       },
       {
        path: '/assignmentPage',
        element: <AssignmentsPage></AssignmentsPage>
       },
       {
        path: '/assignmentCard',
        element: <AssignmentCard></AssignmentCard>
       },
       {
        path: '/update-assignment/:id',
        element: <UpdateAssignmentPage></UpdateAssignmentPage>
       },
{
  path: '/assignment/:id',
  element: <PrivateRoute><AssignmentDetails></AssignmentDetails></PrivateRoute>
},

       {
        path: '/pendingAssignment',
        element: <PrivateRoute><PendingAssignment></PendingAssignment></PrivateRoute>
       },
       {
        path:'/give-marks/:id',
        element:<GiveMarks></GiveMarks>
       }
     
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider> <RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
