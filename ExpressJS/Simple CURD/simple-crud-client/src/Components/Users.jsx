import React from 'react';

const Users = () => {

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
        console.log('Data After create a user',data);
        if (data.acknowledged) {
            alert('User added successfully');
            e.target.reset();
        }
    })

}
    return (
        <div>
            {/* Add User */}

            <div className='w-xl mx-auto py-5'>
                <h1 className="text-2xl font-bold">Add User</h1>
                <form onSubmit={handleAddUser} className="flex flex-col gap-4">
                    <input name='name' type="text" placeholder="Name" className="border p-2" />
                    <input name='email' type="email" placeholder="Email" className="border p-2" />
                    <button  type="submit" className="bg-blue-500 text-white p-2">Add User</button>
                </form>
            </div>
        </div>
    );
};

export default Users;