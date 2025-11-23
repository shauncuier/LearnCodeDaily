"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight text-primary">
            BloodCare+
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 font-medium text-sm">
            <Link href="/search" className="text-gray-700 hover:text-primary transition-colors">Find Donors</Link>
            <Link href="/requests" className="text-gray-700 hover:text-primary transition-colors">Blood Requests</Link>
            <Link href="/request" className="text-gray-700 hover:text-primary transition-colors">Request Blood</Link>

            {!user && (
              <>
                <Link href="/volunteer/register" className="text-gray-700 hover:text-primary transition-colors">Volunteer</Link>
                <Link href="/login" className="text-gray-700 hover:text-primary transition-colors">Login</Link>
                <Link href="/register" className="bg-primary text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors shadow-md hover:shadow-lg">
                  Register as Donor
                </Link>
              </>
            )}

            {user && (
              <>
                <Link href="/dashboard" className="text-gray-700 hover:text-primary transition-colors">Dashboard</Link>
                {(hasRole('admin') || hasRole('super_admin')) && (
                  <Link href="/admin" className="text-gray-700 hover:text-primary transition-colors">Admin</Link>
                )}
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {user.name} ({user.role})
                  </span>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-gray-100 animate-in slide-in-from-top-5">
            <Link href="/search" className="block text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Find Donors</Link>
            <Link href="/request" className="block text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Request Blood</Link>

            {!user && (
              <>
                <Link href="/volunteer/register" className="block text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Volunteer</Link>
                <Link href="/login" className="block text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Login</Link>
                <Link href="/register" className="block text-primary font-bold" onClick={() => setIsOpen(false)}>Register as Donor</Link>
              </>
            )}

            {user && (
              <>
                <Link href="/dashboard" className="block text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <button
                  onClick={() => { logout(); setIsOpen(false); }}
                  className="block w-full text-left text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
