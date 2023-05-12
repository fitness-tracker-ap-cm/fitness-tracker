import React from "react";
import './Home.css'

const Home = ({isLoggedIn, currentUser}) => {
  return (
    <div>
    {isLoggedIn ? (<h1>Welcome {currentUser}!</h1>): ( 
      <>
        <h1>Begin your Journey on the path to getting fit!</h1>
        <h3 className="login">Login or Register to get started!</h3>
      </>
    )}
     
    </div>
  );
};

export default Home;
