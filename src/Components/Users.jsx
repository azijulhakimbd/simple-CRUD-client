import React from 'react';

const Users = () => {
    const handleAddUser = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;

        const user = { name, email };

        // send data to the server
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('User added successfully');
                    form.reset();
                }
            })
    }
    return (
        <div>
            {/* add user */}
            <div>
                <form onSubmit={handleAddUser}>
                    <input type="text" name='name' />
                    <br />
                    <input type="email" name='email' />
                    <br />
                    <input type="submit" value="Add User" />
                </form>
            </div>
        </div>
    );
};

export default Users;