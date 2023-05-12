import React from "react";
import { useNavigate } from "react-router-dom";
import './Activities.css'

const Activities = ({ isLoggedIn, allActivities }) => {
  const navigate = useNavigate();

  return (
    <div>
      {isLoggedIn ? (
        <div className="container">
          <button className="create-button"
            onClick={() => {
              navigate("/CreateActivity");
            }}
          >
            Create Activity
          </button>

          <h1 className="activity-title">All Activities</h1>
          <div className="App">
          <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
          {allActivities.map((activity) => {
            return (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td className="name">{activity.name}</td>
                <td className="description">{activity.description}</td>
              </tr>
            );
          })}
          </tbody>
          </table>
          </div>
        </div>
      ) : (
        <div>
          <h1>All activities</h1>
          <div className="App">
          <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
          {allActivities.map((activity) => {
            return (
              <tr key={activity.id}>
                <td>{activity.id}</td>
                <td className="name">{activity.name}</td>
                <td className="description">{activity.description}</td>
              </tr>
            );
          })}
          </tbody>
          </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
