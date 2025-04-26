import React from 'react';
import { createBrowserRouter } from 'react-router';
import Root from '../Pages/Root/Root';
import Home from '../Pages/Home/Home';
import About from '../Pages/About/About';

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        errorElement: <div>error</div>, // Error element to be displayed in case of an error
        children: [
            {
                index: true, // This will make this route the default route
                Component: Home, // This is the element to be displayed when the user visits the root path
            },
            {
                path: "/about",
                Component: About, // This is the element to be displayed when the user visits the about path
            },
            {
            }]
    },

]);
