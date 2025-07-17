import Link from 'next/link';
import React from 'react';

const NavBar = () => {
    return (
        <div>
            <nav className="bg-gray-800 text-white p-4">
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-gray-400">Home</Link>
                    </li>
                    <li>
                        <Link href="/contact" className="hover:text-gray-400">Contact</Link>
                    </li>
                    <li>
                        <Link href="/about" className="hover:text-gray-400">About</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBar;