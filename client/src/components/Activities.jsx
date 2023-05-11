import React from "react";
import { useNavigate } from "react-router-dom";
import './Activities.css'

const Activities = ({ isLoggedIn, allActivities }) => {
  const navigate = useNavigate();

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <button className="create-button"
            onClick={() => {
              navigate("/CreateActivity");
            }}
          >
            Create Activity
          </button>

          <h1>All Activities</h1>
          {allActivities.map((activity) => {
            return (
              <div key={activity.id}>
                <h1>{activity.name}</h1>
                <h3>{activity.description}</h3>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h1>Display all activities</h1>
          {allActivities.map((activity) => {
            return (
              <div key={activity.id}>
                <h1>{activity.name}</h1>
                <h3>{activity.description}</h3>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Activities;
