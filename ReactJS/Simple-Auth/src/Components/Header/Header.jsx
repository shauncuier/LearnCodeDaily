import React from 'react';
import { Helmet } from 'react-helmet';

const Header = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <h1>Header</h1>
        </div>
    );
};

export default Header;