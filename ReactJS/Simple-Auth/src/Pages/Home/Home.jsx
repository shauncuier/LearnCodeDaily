import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { Outlet } from 'react-router';

const Home = () => {
    return (
        <div>
            <Header />
            <h1>Home</h1>
            <Outlet />
            <Footer />
        </div>
    );
};

export default Home;