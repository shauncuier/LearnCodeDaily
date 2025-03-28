import React from 'react';
import './User.css';
import Swal from 'sweetalert2';

function User({ user }) {
    const { name, userId, image } = user;


    const handleAlert = () => {
        Swal.fire({
            title: name,
            text: 'Friend Added',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
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