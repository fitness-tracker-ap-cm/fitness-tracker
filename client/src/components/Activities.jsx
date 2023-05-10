import React from "react";

const Activities = ({ isLoggedIn, allActivities, setAllActivities }) => {
  console.log(isLoggedIn);
  console.log(setAllActivities);
  console.log(allActivities);
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Create an activity</h1>
          <form>
            <label>Name: </label>
            <input placeholder="Name" />
            <label>Description: </label>
            <input placeholder="description" />
          </form>
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
