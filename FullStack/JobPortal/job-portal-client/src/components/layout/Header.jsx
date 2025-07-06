import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiBriefcase, FiFileText, FiPlus } from 'react-icons/fi';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <FiBriefcase className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-800">Career Code</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors">
              Jobs
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/add-job" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <FiPlus className="text-sm" />
                  <span>Post Job</span>
                </Link>
                
                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <FiUser className="text-sm" />
                    </div>
                    <span className="hidden lg:block">{user.displayName || user.email}</span>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiUser className="text-sm" />
                        <span>Profile</span>
                      </Link>
                      <Link
                        to="/my-jobs"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiBriefcase className="text-sm" />
                        <span>My Jobs</span>
                      </Link>
                      <Link
                        to="/my-applications"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <FiFileText className="text-sm" />
                        <span>My Applications</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <FiLogOut className="text-sm" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Home
              </Link>
              <Link to="/jobs" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Jobs
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                Contact
              </Link>

              {user ? (
                <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                  <Link to="/add-job" className="text-blue-600 font-medium flex items-center space-x-2" onClick={toggleMenu}>
                    <FiPlus className="text-sm" />
                    <span>Post Job</span>
                  </Link>
                  <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2" onClick={toggleMenu}>
                    <FiUser className="text-sm" />
                    <span>Profile</span>
                  </Link>
                  <Link to="/my-jobs" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2" onClick={toggleMenu}>
                    <FiBriefcase className="text-sm" />
                    <span>My Jobs</span>
                  </Link>
                  <Link to="/my-applications" className="text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2" onClick={toggleMenu}>
                    <FiFileText className="text-sm" />
                    <span>My Applications</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <FiLogOut className="text-sm" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4 pt-4 border-t border-gray-200">
                  <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors" onClick={toggleMenu}>
                    Login
                  </Link>
                  <Link to="/register" className="text-blue-600 font-medium" onClick={toggleMenu}>
                    Register
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
