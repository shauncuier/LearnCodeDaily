import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Pages/Root/Root";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {

                index: true,
                Component: Home,
            },
            {

            }]

    },
]);
