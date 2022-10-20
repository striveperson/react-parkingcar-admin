import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "./components/auth/AuthGuard";

import SignIn from "./components/auth/sign-in/SignIn";
import Default from "./components/Default";
import Customer from "./pages/Customer";

const routes = createBrowserRouter([
  {
    path: '/sign-in',
    element: <AuthGuard><SignIn/></AuthGuard>
  },
  {
    path: '/',
    element: <AuthGuard><Default/></AuthGuard>,
    children: [
      {
        path: 'customers/*',
        element: <Customer/>
      },
    ]
  },
]);

export default routes;