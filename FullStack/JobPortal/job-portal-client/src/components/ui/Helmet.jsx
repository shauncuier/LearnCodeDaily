import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet-async';

const Helmet = ({ 
  title = 'Career Code', 
  description = 'Find your dream job or post job listings on Career Code - the modern job portal connecting talent with opportunity.',
  keywords = 'jobs, career, employment, hiring, job search, job portal',
  image = '/favicon.ico'
}) => {
  const fullTitle = title === 'Career Code' ? title : `${title} | Career Code`;
  
  return (
    <ReactHelmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Career Code" />
      <link rel="canonical" href={window.location.href} />
    </ReactHelmet>
  );
};

export default Helmet;
