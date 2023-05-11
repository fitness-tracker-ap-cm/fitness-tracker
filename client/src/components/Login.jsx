import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { loginUser } from "../api";

const Login = ({setIsLoggedIn,setToken, setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) =>{
    event.preventDefault();
    const userToAuth = { username: username, password: password } ;
    const data = await loginUser(userToAuth);
    if (!data){

      window.alert("Invalid credentials, Username or Password is incorrect");
    }
    else
    {
      if (data.token) {
        setToken(data.token);
        setCurrentUser(username);
        localStorage.setItem("currentUser", username);
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setUsername('');
        setPassword('');
        navigate('/Home');
      }
    }  
  }
  return (
    <>
      <h2>Log In</h2>
      <div id='login-container'>
        <form
          onSubmit={handleSubmit} >
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            value={username}
            onChange={(event) => setUsername(event.target.value)} />
          <label htmlFor='password'> Password</label>
          <input
            type='text'
            name='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)} />
          <button type='submit'>LOG IN</button>
        </form>
      </div>
    </>

  );
}

export default Login;
