import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = ({ setCurrentUser, setToken, setIsLoggedIn, isLoggedIn }) => {
  const navigate = useNavigate();
  console.log("is Logged in or not ", isLoggedIn );
  return (
    <header>
      <h1>Fitness Tracker</h1>
      <nav className="nav-bar">
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/Routines">Routines</NavLink>
        <NavLink to="/Activities">Activites</NavLink>
        <NavLink to="/Register">Register</NavLink>
        {isLoggedIn ?  <NavLink to="/MyRoutines">My Routines</NavLink>:<></>}
        {isLoggedIn ? (
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setCurrentUser("");
              setToken("");
              localStorage.removeItem('currentUser');
              localStorage.removeItem('token');
              navigate("/Home");
            }}
          > Logout </button>
        ) : (
          <button
            onClick={() => {
              console.log("Logging in");
              navigate('/Login');
            }}
          > Log In</button>
        )}
      </nav>
    </header>
  );
};

export default Header;
