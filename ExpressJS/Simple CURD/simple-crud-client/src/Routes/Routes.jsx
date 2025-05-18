import { createBrowserRouter } from "react-router";
import App from "../App";
import Users from "../Components/Users";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Page Not Found</div>,

    children: [
      {
        index: true,
        element: <div>Home</div>,
        
      },
    {
        path: "users",
        element: <Users />,
        loader: () => fetch('http://localhost:3000/users'),
        hydrateFallbackElement: <div>Loading...</div>,
    }]
  },
]);