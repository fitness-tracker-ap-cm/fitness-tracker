import React from "react";
import SingleRoutine from "./SingleRoutine";

const Routines = (props) => {
const {allPublicRoutines} = props;
  return (
    <>
      <h1>Routines</h1>
      {allPublicRoutines.length ? (
        <div>
          {allPublicRoutines.map((routine, index) => {
            return (
              <div key={index}>
                <SingleRoutine Routine routine={routine} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h3>No Routines to display</h3>
        </div>
      )}
    </>
  );
};

export default Routines;
