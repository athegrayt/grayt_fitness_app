import React from "react";
import classes from "./NutritionFact.module.css";

const NutritionFact = (props) => {
  return (
    <div className={classes.NutritionFact}>
      <p style={{ fontWeight: "bold" }}>{props.name}</p>
      <p>{props.data + " g"}</p>
    </div>
  );
};
export default NutritionFact;
