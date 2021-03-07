import React from "react";
import Spinner from "../UI/Spinner/Spinner";
import JournalEntry from "../JournalEntry/JournalEntry";
import classes from "./LogSummary.module.css";

const LogSummary = (props) => {
  let entries = <Spinner />;
  let calorieTotal = null;
  if (props.jrlEntry && props.jrlEntry.length !== 0) {
    calorieTotal = props.jrlEntry
      .map((entry) => {
        return entry.nf_calories;
      })
      .reduce((total, cur) => {
        return total + cur;
      });
    calorieTotal = Math.round(calorieTotal);
    entries = props.jrlEntry.map((entry, i) => {
      return <JournalEntry key={entry.consumed_at} id={i} entry={entry} />;
    });
  }
  return (
    <div>
      <h1>Total Cal:{calorieTotal}</h1>
      <div className={classes.LogSummary}>{entries}</div>
    </div>
  );
};
export default LogSummary;
