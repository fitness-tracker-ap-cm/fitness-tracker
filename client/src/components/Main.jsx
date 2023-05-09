import React,{useState,useEffect} from "react";
import {
  Header,
  Login,
  Register,
  Home,
  Routines,
  MyRoutines,
  Activities,
  AddNewRoutine
} from "./index";
import { getAllActivities, getAllPublicRoutines, getMe} from "../api";
import { Routes, Route } from "react-router-dom";


const Main = () => {

    const [currentUser,setCurrentUser] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [allPublicRoutines, setAllPublicRoutines] = useState([]);
    const [allActivities, setAllActivities] = useState([]);

    useEffect(( )=>{
        const getInitialData = async () => {
            try {
              let allRoutines = await getAllPublicRoutines();
              setAllPublicRoutines(allRoutines);
              let allActivities = await getAllActivities();
              setAllActivities(allActivities);
              if(token){ setIsLoggedIn(true);}
            
            } catch (error) {
              console.error(error);
            }
          };
          getInitialData();

    },[]);

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

    console.log("Assigning all routines",allPublicRoutines);
    console.log("Assigning all activities" , allActivities);
  return (
    <div id="main">
      <Header isLoggedIn ={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setCurrentUser={setCurrentUser}
        setToken={setToken} />
      <Routes>
        {/* christian */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Activities" element={<Activities />} />

        {/*aparna  */}
        <Route path="/Routines" element={<Routines allPublicRoutines = {allPublicRoutines} currentUser = {currentUser} isLoggedIn = {isLoggedIn}/>} />
        <Route path="/MyRoutines" element={<MyRoutines currentUser = {currentUser} token = {token} setIsLoggedIn = {setIsLoggedIn} isLoggedIn = {isLoggedIn}/>} />
        <Route path='/Login' element={<Login isLoggedIn = {isLoggedIn} setIsLoggedIn = {setIsLoggedIn } token = {token} setToken = {setToken} currentUser = {currentUser} setCurrentUser = {setCurrentUser} />} />
        <Route path ='/AddNewRoutine' element ={<AddNewRoutine currentUser = {currentUser} token = {token}  />}/>
      </Routes>
    </div>
  );
};

export default Main;
