import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div>  
            <Header />
            <Outlet></Outlet>
            

            <Footer></Footer>
        </div>
    );
};

export default Root;