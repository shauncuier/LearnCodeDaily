import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer style={{
                backgroundColor: '#1f2937',
                color: 'white',
                padding: '2rem 0'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: '0 1rem'
                }}>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <h3 style={{ 
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}>About Us</h3>
                            <p style={{ color: '#9ca3af' }}>Your trusted partner in technology solutions.</p>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <h3 style={{
                                fontSize: '1.25rem',
                                fontWeight: 'bold',
                                marginBottom: '0.5rem'
                            }}>Contact</h3>
                            <p style={{ color: '#9ca3af' }}>Email: info@example.com</p>
                            <p style={{ color: '#9ca3af' }}>Phone: (123) 456-7890</p>
                        </div>
                    </div>
                    <div style={{
                        textAlign: 'center',
                        marginTop: '2rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid #374151'
                    }}>
                        <p style={{ color: '#9ca3af' }}>&copy; 2024 Your Company. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;