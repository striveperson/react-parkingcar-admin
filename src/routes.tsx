import { createBrowserRouter } from "react-router-dom";

import SignIn from "./components/auth/sign-in/SignIn";
import Default from "./components/Default";
import Customer from "./pages/Customer";

const routes = createBrowserRouter([
  {
    path: '/sign-in',
    element: <SignIn/>
  },
  {
    path: '/',
    element: <Default/>,
    children: [
      {
        path: 'customers/*',
        element: <Customer/>
      },
    ]
  },
]);

export default routes;