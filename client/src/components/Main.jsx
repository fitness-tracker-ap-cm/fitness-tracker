import React from "react";
import {
  Header,
  Login,
  Register,
  Home,
  Routines,
  MyRoutines,
  Activities,
} from "./index";
import { Routes, Route } from "react-router-dom";

const Main = () => {
  return (
    <div id="main">
      <Header />
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Routines" element={<Routines />} />
        <Route path="/MyRoutines" element={<MyRoutines />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Main;
