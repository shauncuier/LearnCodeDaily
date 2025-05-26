import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <img
                src="https://illustrations.popsy.co/gray/job-hunt.svg"
                alt="404 Not Found"
                className="w-80 mb-6"
            />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6 text-center max-w-md">
                Oops! The page you're looking for doesn't exist or has been moved. Try going back to the homepage.
            </p>
            <Link
                to="/"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
                Back to Home
            </Link>
        </div>
    );
};

export default ErrorPage;