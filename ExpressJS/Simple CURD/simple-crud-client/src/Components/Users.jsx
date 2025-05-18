
import { useState } from 'react';
import { useLoaderData } from 'react-router';

const Users = () => {
    const user = useLoaderData();

    const [users, setUsers] = useState(user);
    console.log(users);

    // Handle add user

    const handleAddUser = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const user = { name, email };
        console.log(user);
        // Add user to the database

        // Create a new user

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then(res => res.json())
            .then(data => {
                console.log('Data After create a user', data);
                if (data.acknowledged) {


                    // Add the new user to the state
                    setUsers([...users, user]);
                    

                    alert('User added successfully');
                    e.target.reset();
                }
            })

    }


    const handleDeleteUser = (id) => {
        console.log(id);
        // Delete user from the database
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE',
        }).then(res => res.json())
            .then(data => {
                console.log('Data After delete a user', data);

                if (data.deletedCount > 0) {
                    // Remove the deleted user from the state
                    const remainingUsers = users.filter(user => user._id !== id);
                    setUsers(remainingUsers);
                    alert('User deleted successfully');
                }
                
            })
    }
    return (
        <div>
            {/* Add User */}

            <div className='w-xl mx-auto py-5'>
                <h1 className="text-2xl font-bold">Add User</h1>
                <form onSubmit={handleAddUser} className="flex flex-col gap-4">
                    <input required name='name' type="text" placeholder="Name" className="border p-2" />
                    <input required name='email' type="email" placeholder="Email" className="border p-2" />
                    <button type="submit" className="bg-blue-500 text-white p-2">Add User</button>
                </form>
            </div>

            {/* Show Users */}

            <div className='w-xl mx-auto py-5'>
                <h1 className="text-2xl font-bold">Users</h1>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td onClick={()=>handleDeleteUser(user._id)} className='btn btn-accent'>X</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
            {/* Show Users */}


        </div>
    );
};

export default Users;