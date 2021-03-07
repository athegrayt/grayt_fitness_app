import React from "react";
import classes from "./LogEntry.module.css";

const LogEntry = (props) => {
  let { consumed_at } = props.entry;
  consumed_at = consumed_at.slice(0, 10);

  return (
    <div
      id={props.id}
      className={classes.LogEntry}
      onClick={props.deleteRequestHandler}
    >
      <p>{consumed_at}</p>
    </div>
  );
};

export default LogEntry;
