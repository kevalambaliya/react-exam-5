import React, { useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [userdata,setUserData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    handleUser();
    getUser();
  };

  const handleUser = async () => {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const getUser = async () => {
    const req = await fetch("http://localhost:3000/users");
    const res = await  req.json();
    setUserData(res);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/users/${id}`,{
        method:"DELETE",
    });
    getUser();
  }

  getUser();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={(e) => {
            setData({ ...data, username: e.target.value });
          }}
        />
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        />
        <input
          type="text"
          name="password"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        />
        <input type="submit" value="submit" />
      </form>
      {
        userdata.map((user)=>(
            <div key={user.id}>
                <h3>Username:{user.username}</h3>
                <h3>Email:{user.email}</h3>
                <h3>Password:{user.password}</h3>
                <button onClick={()=> handleDelete(user.id)}>DELETE</button>
            </div>
        ))
      }
    </div>
  );
};

export default Form;
