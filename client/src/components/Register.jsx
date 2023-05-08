import React, { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form>
        <label>Username</label>
        <input placeholder="Enter a username" />
        <label>Password</label>
        <input placeholder="Enter a password" />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
