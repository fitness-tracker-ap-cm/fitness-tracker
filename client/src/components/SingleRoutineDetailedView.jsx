import React from "react";
import "./SingleRoutine.css";

const SingleRoutineDetailedView = (props) => {
  const { routine } = props;

  return (
    <div>
      <p><b>Routine name : </b>{routine.name}</p>
      <p>
        <b>Goal : </b>
        {routine.goal}
      </p>
      <button>View or Modify Routine</button>
    </div>
  );
};
export default SingleRoutineDetailedView;
