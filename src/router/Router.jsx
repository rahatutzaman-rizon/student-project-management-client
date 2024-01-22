import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import PrivateRouteAlt from "../manageRoute/PrivateRouteAlt";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Assignments from "../pages/Assignments";
import CreateAssignment from "../pages/CreateAssignment";
import MyAssignments from "../pages/MyAssignments";
import SubmittedAssignments from "../pages/SubmittedAssignments";
import PrivateRoute from "../manageRoute/PrivateRoute";
import AssignmentDetails from "../pages/AssignmentDetails";
import UpdateAssignments from "../pages/UpdateAssignments";
import Groups from "../Groups/Groups";
import GroupPage from "../Groups/GroupPage";
//import { DashboardLayout } from "../Groups/Dashboard/DashboardLayout";
import Dashboard from "../Groups/Dashboard/Dashboard";
import Move from "../Groups/Dashboard/Move";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <PrivateRouteAlt><Login /></PrivateRouteAlt>
      },
      {
        path: '/register',
        element: <PrivateRouteAlt><Register /></PrivateRouteAlt>
      },
      {
        path: '/assignments',
        element: <Assignments />
      },
      {
        path: '/assignments/:id',
        element: <PrivateRoute><AssignmentDetails /></PrivateRoute>
      },
      {
        path: '/create-assignment',
        element: <PrivateRoute><CreateAssignment /></PrivateRoute>
      },
      {
        path: '/my-assignments',
        element: <PrivateRoute><MyAssignments /></PrivateRoute>
      },
      {
        path: '/assignments/update/:id',
        element: <PrivateRoute><UpdateAssignments /></PrivateRoute>
      },
      {
        path: '/submitted-assignments',
        element: <PrivateRoute><SubmittedAssignments /></PrivateRoute>
      },   {
        path: '/group',
        element: <PrivateRoute><Groups></Groups></PrivateRoute>
      },
      
      {path: '/group/:id',
      element: <PrivateRoute><GroupPage></GroupPage></PrivateRoute>,
      loader:({params})=> fetch(`http://localhost:5000/member/${params.id}`),
    },

    {
      path: '/move/:id',
      element: <PrivateRoute><Move></Move></PrivateRoute>,

}
     
      // {
      //   path: '/dashboard',
      //   element: ,
      // children:[

    
      //   ]
      // },
    ]
  }
])