import React from "react";
import "./SingleRoutine.css";

const ModifyRoutine = (props) => {
  const {selectedRoutine, token, currentUser} = props;
console.log(selectedRoutine, token, currentUser);
  return (
    <div>
      <p>Name:{selectedRoutine.name}</p>
    </div>  
  );
};
export default ModifyRoutine;
