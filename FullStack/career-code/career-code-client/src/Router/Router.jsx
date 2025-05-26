import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import RootLayout from "../Layouts/RootLayout";
import ErrorPage from "../Pages/Error/ErrorPage";
import Register from "../Pages/Auth/Register";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,

    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'register',
        Component: Register
      
      }
    ]
  },
]);