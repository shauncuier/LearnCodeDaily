import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-white p-4">
                <p className="text-center">&copy; {new Date().getFullYear()} My Next.js App</p>
            </footer>
        </div>
    );
};

export default Footer;