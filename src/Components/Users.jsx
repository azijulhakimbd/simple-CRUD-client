import React, { use, useState } from "react";
import { Link } from "react-router";

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
  const handleUserDelete = (id) => {
    console.log("Delete This User", id);
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
          console.log("after delete", data);
        }
      });
  };
  return (
    <div className="border border-dashed  rounded-2xl shadow-2xl py-15">
      {/* add user */}
      <div>
        <h1 className="text-2xl font-bold text-center">
          Simple Crud Operation
        </h1>
        <h3 className="text-xl font-semibold text-center">
          {" "}
          Users: {users.length}
        </h3>
        <form
          className="flex justify-center items-center py-5"
          onSubmit={handleAddUser}
        >
          <input
            className="border-2 p-2 m-2  bg-amber-100 rounded-2xl"
            type="text"
            name="name"
          />
          <br />
          <input
            className="border-2 p-2 m-2  bg-amber-100 rounded-2xl"
            type="email"
            name="email"
          />
          <br />
          <input
            className="border-2 p-2 m-2  rounded-2xl bg-amber-500"
            type="submit"
            value="Add User"
          />
        </form>
      </div>
      {/* view data */}
      <div className="text-center p-2 m-2 mt-5 rounded-2xl">
        {users.map((user) => (
          <p className="border shadow border-dotted m-2 p-2 rounded-2xl" key={user._id}>
            {user.name}:{user.email}
            <Link
              className="btn bg-amber-200 mx-2 text-blue-600"
              to={`/users/${user._id}`}
            >
              Details
            </Link>
            <Link
              className="btn bg-amber-200 mx-2 text-blue-600"
              to={`/update/${user._id}`}
            >
              Edit
            </Link>
            <button
              onClick={() => handleUserDelete(user._id)}
              className="btn text-white bg-red-600 pl-5"
            >
              X
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
