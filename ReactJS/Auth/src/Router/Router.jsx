import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root/Root";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Blog from "../Pages/Blog/Blog";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,

        errorElement: <div>Error</div>,

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
        ]
    },
]);