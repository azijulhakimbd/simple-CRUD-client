import React from 'react';
import { useLoaderData } from 'react-router';

const UpdateUser = () => {
    const user =useLoaderData();
    console.log(user);
    const handleUpdateUser=e=>{
        e.preventDefault();
        const name =e.target.name.value;
        const email =e.target.email.value;
        const updatedUser={name,email}
        console.log(UpdateUser);

        // Update user info in the DB
        fetch(`http://localhost:3000/users/${user._id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(updatedUser)
        })
        .then(res =>res.json())
        .then(data=>{
            if(data.modifiedCount){

                console.log('after update data',data);
            }
            
        })
        
    }
    return (
        <div>
             <div >
        <h1 className="text-2xl font-bold text-center">Update User</h1>
    
        <form className="lg:flex lg:justify-center lg:items-center space-y-4 lg:py-5" onSubmit={handleUpdateUser}>
          <input className="border-2 lg:p-2 lg:m-2 bg-amber-100 rounded sm:pl-10 lg:rounded-2xl" type="text" name="name" defaultValue={user.name} />
          <br />
          <input className="border-2 lg:p-2 lg:m-2 bg-amber-100 rounded sm:pl-10 lg:rounded-2xl" type="email" name="email" defaultValue={user.email} />
          <br />
          <input className="border-2 lg:p-2 lg:m-2 rounded sm:pl-10 lg:rounded-2xl bg-amber-500" type="submit" value="Update User" />
        </form>
      </div>
        </div>
    );
};

export default UpdateUser;