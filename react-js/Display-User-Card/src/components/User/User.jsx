import React from 'react';
import './User.css';
function User({user}) {
    const {name, userId, email, location, image } = user;
    
    const handleAlert = () => {
        alert(`Hello ${name}`);
    }
    
    return (
        <div className='user'>
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <h5>{userId}</h5>
            <button onClick={handleAlert}>Add Friend</button>
        </div>
    );
}

export default User;