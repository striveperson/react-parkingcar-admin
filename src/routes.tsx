import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import AuthGuard from "./components/auth/AuthGuard";
import SignIn from "./components/auth/sign-in/SignIn";
import Default from "./components/Default";

const Customer = lazy(() => import("./pages/Customer"));

const routes = createBrowserRouter([
  {
    path: '/sign-in',
    element: <AuthGuard><SignIn/></AuthGuard>
  },
  {
    path: '/*',
    element: <AuthGuard><Default/></AuthGuard>,
    children: [
      {
        path: 'customers/*',
        element: <Customer/>
      },
      {
        path: '*',
        element:<Navigate to="/customers/customer" replace />,
      },
    ]
  },
]);

export default routes;