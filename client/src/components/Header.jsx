import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  //   const navigate = useNavigate();
  return (
    <header>
      <h1>Fitness Tracker</h1>
      <nav className="nav-bar">
        <NavLink to="/Home">Home</NavLink>
        <NavLink to="/Routines">Routines</NavLink>
        <NavLink to="/MyRoutines">My Routines</NavLink>
        <NavLink to="/Activities">Activites</NavLink>
        <NavLink to="/Login">Login</NavLink>
        <NavLink to="/Register">Register</NavLink>
      </nav>
    </header>
  );
};

export default Header;
