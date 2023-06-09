import React, { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import './Login.css'
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
      const data = await registerUser(userObj);
      if(data.token) {
        setToken(data.token);
        setCurrentUser(username);
        setIsLoggedIn(true);
        navigate("/Home");
      }else{
        if(data.message){
          alert(data.message)
        }
      }
      
    }
  };
  return (
    <>

    <h2>Register</h2>
    <div id="login-container">
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
        className="login-field"
          placeholder="Enter a username"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password: </label>
        <input
        className="login-field"
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
    </>
  );
};

export default Register;
