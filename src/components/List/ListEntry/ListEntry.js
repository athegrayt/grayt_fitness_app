import React from "react";

const ListEntry = (props) => {
  return (
    <ul>
      <li>
        {props.time}
        {props.foodEntry}
        {props.calories}
      </li>
    </ul>
  );
};

export default ListEntry;
