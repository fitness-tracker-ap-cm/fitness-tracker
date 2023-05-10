import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

const Register = ({ setCurrentUser, setIsLoggedIn, setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password.length <= 8) {
      alert("password is too short!");
    } else {
      const userObj = { username: username, password: password };
      const { user, token } = await registerUser(userObj);
      if (token) {
        setToken(token);
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/Home");

        console.log(user);
      }
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
