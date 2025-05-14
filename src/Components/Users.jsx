import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;

    const user = { name, email };

    // send data to the server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          user._id = data.insertedId;
          const newUsers = [...users, user];
          setUsers(newUsers);
          alert("User added successfully");
          form.reset(); 
        }
      });
   
  };
     const handleUserDelete=(id)=>{
        console.log('Delete This User', id);
        
      }
  return (
    <div className="border border-amber-50 rounded-2xl shadow-2xl py-15">
      {/* add user */}
      <div >
        <h1 className="text-2xl font-bold text-center">Simple Crud Application</h1>
        <form className="flex justify-center items-center py-5" onSubmit={handleAddUser}>
          <input className="border-2 bg-amber-100 rounded-2xl" type="text" name="name" />
          <br />
          <input className="border-2 bg-amber-100 rounded-2xl" type="email" name="email" />
          <br />
          <input className="border-2 rounded-2xl bg-amber-500" type="submit" value="Add User" />
        </form>
      </div>
      {/* view data */}
      <div className="text-center border rounded-2xl">
        {users.map((user) => (
        <p key={user._id}>
          {user.name}:{user.email}
          <button onClick={()=> handleUserDelete (user._id)} className="btn text-red-600 pl-5" >X</button>
        </p>
      ))}
      </div>
    </div>
  );
};

export default Users;
