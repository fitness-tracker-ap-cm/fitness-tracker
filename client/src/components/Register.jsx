import React, { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userObj = {
      username,
      password,
    };
    try {
      const { user, token } = await registerUser(userObj);
      if (token) {
        console.log(user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
          placeholder="Enter a username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password: </label>
        <input
          placeholder="Enter a password"
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
