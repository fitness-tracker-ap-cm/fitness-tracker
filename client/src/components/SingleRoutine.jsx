import React from "react";
import SingleActivity from "./SingleActivity";
import './SingleRoutine.css';

const SingleRoutine =  (props) => {
 const {routine} = props;
    return (
      <>
        <div id = 'single-routine-container' >
          <h2>Routine name : {routine.name}</h2>
          <p><b>Goal : </b>{routine.goal}</p>
          <p>
            <b>Creator name :</b> {routine.creatorName} 
          </p>
          <h2>Activities for the routine</h2>
          {routine.activities.length ? (
            <div>
              {routine.activities.map((activity, index) => {
                return (
                  <div key={index}>
                    <SingleActivity activity={activity} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h3>No Activities to display</h3>
            </div>
          )}
        </div>
      </>
    );

}
export default SingleRoutine;