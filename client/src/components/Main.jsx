import React, { useState, useEffect } from "react";
import {
  Header,
  Login,
  Register,
  Home,
  Routines,
  MyRoutines,
  Activities,
} from "./index";
import { getAllActivities, getAllPublicRoutines } from "../api";
import { Routes, Route } from "react-router-dom";

const Main = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allPublicRoutines, setAllPublicRoutines] = useState([]);
  const [allActivities, setAllActivities] = useState([]);

  useEffect(() => {
    const getInitialData = async () => {
      try {
        let allRoutines = await getAllPublicRoutines();
        setAllPublicRoutines(allRoutines);
        let allActivities = await getAllActivities();
        setAllActivities(allActivities);
      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, []);
  console.log("Assigning all routines", allPublicRoutines);
  console.log("Assigning all activities", allActivities);
  return (
    <div id="main">
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
        setToken={setToken}
      />
      <Routes>
        {/* christian */}
        <Route path="/Home" element={<Home />} />
        <Route
          path="/Register"
          element={
            <Register
              setToken={setToken}
              setCurrentUser={setCurrentUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/Activities" element={<Activities />} />

        {/*aparna  */}
        <Route path="/Routines" element={<Routines />} />
        <Route path="/MyRoutines" element={<MyRoutines />} />
        <Route
          path="/Login"
          element={
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              setToken={setToken}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default Main;
