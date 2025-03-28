import React from 'react';
import { use } from 'react';
import User from '../User/User';
import './Users.css';
function Users({usersData}) {
    const users = use(usersData);
    
    return (
        <div>
            <h3>Users: {users.length}</h3>
            <div className='users-grid'>
            {
                users.map(user => <User key={user.id} user={user}></User>)
            }
            </div>
        </div>
    );
}

export default Users;