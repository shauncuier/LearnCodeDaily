import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Blog from "../Pages/Blog/Blog";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Singin from "../Pages/Auth/Singin/Singin";
import Register from "../Pages/Auth/Register/Register";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,

        errorElement: <ErrorPage></ErrorPage>,

        children: [
            {
                path: "/",
                Component:Home,
                index: true,

            },
            {
                path: "/about",
                Component: About,

            },
            {
                path: "/blogs",
                Component: Blog,
            }
            ,
            {
                path: "/singin",
                Component: Singin,
            }
            ,
            {
                path: "/register",
                Component: Register,
            }
        ]
    },
]);