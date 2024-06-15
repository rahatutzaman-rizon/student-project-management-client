import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import PrivateRouteAlt from "../manageRoute/PrivateRouteAlt";
import Login from "../pages/Login";
import Register from "../pages/Register";


import PrivateRoute from "../manageRoute/PrivateRoute";

import Groups from "../Groups/Groups";

import Teacher from "../Groups/Teacher";
import Project from "../pages/Project";
import Projects from "../pages/Projects";
import ProjectDetails from "../pages/ProjectDetails";
import Update from "../pages/Update";

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
        path: '/project',
        element: <Project></Project>
      },
      {
        path: '/project/:id',
        element: <Projects></Projects>
      },
      {
        path: '/:team/:id',
        element: <ProjectDetails></ProjectDetails>
      },



     
     
     
        {
        path: '/group',
        element: <PrivateRoute><Groups></Groups></PrivateRoute>
      },

      {
        path: '/update',
        element: <PrivateRoute><Update></Update></PrivateRoute>
      },
      
      {
        path: '/teacher/:id',
        element: <PrivateRoute><Teacher></Teacher></PrivateRoute>
      },
     

    

      // {
      //   path: '/dashboard',
      //   element: ,
      // children:[

    
      //   ]
      // },
    ]
  }
])