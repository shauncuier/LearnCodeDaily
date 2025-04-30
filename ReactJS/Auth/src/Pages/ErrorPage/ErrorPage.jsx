import React from 'react';

const ErrorPage = () => {
    return (

        <>
            <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
                <div className="text-center px-6">
                    <h1 className="text-9xl font-bold text-gray-800">404</h1>
                    <p className="text-2xl md:text-3xl font-light text-gray-600 mt-4">
                        Oops! Page not found.
                    </p>
                    <p className="mt-2 text-gray-500">
                        The page you're looking for doesn't exist.
                    </p>
                    <a href="/" className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
                        Go Home
                    </a>
                </div>
            </div>
        </>

    );
};

export default ErrorPage;