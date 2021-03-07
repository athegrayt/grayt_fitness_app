import React from "react";
import ListEntry from "./UserOutput/ListEntry";

const List = (props) => {
  return props.listEntries.map((entry, i) => {
    return (
      <ListEntry
        time={props.curTime}
        foodEntry={props.description}
        calories={props.cal}
      />
    );
  });
};

export default List;
