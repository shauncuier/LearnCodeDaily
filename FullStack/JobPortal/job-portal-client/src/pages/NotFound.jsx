import React from 'react';
import { Link } from 'react-router-dom';
import Helmet from '../components/ui/Helmet';
import { FiHome, FiSearch, FiBriefcase, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <>
      <Helmet 
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Career Code home page."
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            {/* 404 Illustration */}
            <div className="mx-auto h-32 w-32 text-blue-600 mb-8">
              <svg
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors space-x-2"
            >
              <FiHome className="w-5 h-5" />
              <span>Go Home</span>
            </Link>
            
            <Link
              to="/jobs"
              className="w-full flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors space-x-2"
            >
              <FiBriefcase className="w-5 h-5" />
              <span>Browse Jobs</span>
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center justify-center space-x-2">
              <FiSearch className="w-5 h-5" />
              <span>Looking for something specific?</span>
            </h3>
            <p className="text-gray-600 mb-4">
              Try searching for jobs or explore our popular categories.
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                to="/jobs?category=technology"
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                Technology
              </Link>
              <Link
                to="/jobs?category=marketing"
                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
              >
                Marketing
              </Link>
              <Link
                to="/jobs?category=design"
                className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium hover:bg-purple-200 transition-colors"
              >
                Design
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors space-x-2"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
