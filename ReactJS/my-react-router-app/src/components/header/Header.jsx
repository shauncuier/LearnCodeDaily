import React from 'react';
import { Link, NavLink } from 'react-router';

const Header = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>

                    </li>
                    <li>
                        <NavLink to="/laptops">Laptops</NavLink>
                    </li>
                    <li>
                        <NavLink to="/mobiles">Mobiles</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;