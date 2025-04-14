import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router';

const Root = () => {
    return (
        <div>
            <h1>Root Page</h1>

            <Header />


            <Outlet></Outlet>



        </div>
    );
};

export default Root;