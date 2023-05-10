import React, { useState, useEffect } from "react";
import {
  Header,
  Login,
  Register,
  Home,
  Routines,
  MyRoutines,
  Activities,
  AddNewRoutine,
  ModifyRoutine,
  CreateActivity,
} from "./index";
import { getAllActivities, getAllPublicRoutines, getMe } from "../api";
import { Routes, Route } from "react-router-dom";

const Main = () => {

  const [currentUser, setCurrentUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allPublicRoutines, setAllPublicRoutines] = useState([]);
  const [allActivities, setAllActivities] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState({});

  useEffect(() => {
    const getInitialData = async () => {
      try {
        let allRoutines = await getAllPublicRoutines();
        setAllPublicRoutines(allRoutines);
        let allActivities = await getAllActivities();
        setAllActivities(allActivities);
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getInitialData();
  }, []);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (token) {
          const fetchedUser = await getMe(token);
          setCurrentUser(fetchedUser.username);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [token]);

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
        <Route path="/Home" element={<Home isLoggedIn={isLoggedIn} currentUser={currentUser}/>} />
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
        <Route
          path="/Activities"
          element={
            <Activities
              isLoggedIn={isLoggedIn}
              allActivities={allActivities}
              setAllActivities={setAllActivities}
            />
          }
        />
        <Route
          path="/CreateActivity"
          element={
            <CreateActivity
              token={token}
              setAllActivities={setAllActivities}
              allActivities={allActivities}
            />
          }
        />

        {/*aparna  */}

        <Route path="/Routines" element={<Routines allPublicRoutines = {allPublicRoutines} currentUser = {currentUser} isLoggedIn = {isLoggedIn}/>} />
        <Route path="/MyRoutines" element={<MyRoutines setAllPublicRoutines = {setAllPublicRoutines} allPublicRoutines = {allPublicRoutines} selectedRoutine = {selectedRoutine} setSelectedRoutine = {setSelectedRoutine}currentUser = {currentUser} token = {token} setIsLoggedIn = {setIsLoggedIn} isLoggedIn = {isLoggedIn}/>} />
        <Route path='/Login' element={<Login isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn } token = {token} setToken = {setToken} currentUser = {currentUser} setCurrentUser = {setCurrentUser} />} />
        <Route path ='/AddNewRoutine' element ={<AddNewRoutine currentUser = {currentUser} token = {token} setAllPublicRoutines = {setAllPublicRoutines} allPublicRoutines = {allPublicRoutines}/>}/>
        <Route path = '/ModifyRoutine' element = {<ModifyRoutine selectedRoutine = {selectedRoutine} setSelectedRoutine = {setSelectedRoutine} currentUser = {currentUser} token = {token}/>}/>

      </Routes>
    </div>
  );
};

export default Main;
