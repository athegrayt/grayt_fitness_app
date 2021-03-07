import React from "react";
import classes from "./JournalEntry.module.css";
import PropTypes from "prop-types";
import { timeFormatConvert } from "../../shared/utility";

const JournalEntry = (props) => {
  const { serving_qty} = props.entry;
  let { consumed_at, serving_unit, food_name } = props.entry;
  serving_unit = serving_unit + ' of'
  let unitArray = serving_unit.split(' ');
  consumed_at = timeFormatConvert(consumed_at);
  
  unitArray.forEach((word) => {
		if (word.includes('(')) {
			serving_unit = unitArray[0];
			if (serving_qty > 1) {
				serving_unit = `${serving_unit}s of`;
				unitArray = serving_unit.split(' ');
			}
		}
		if (food_name.includes(word)) {
			serving_unit = '';
    }
    if(serving_unit.length>1){
      serving_unit = `${unitArray[0]} of`
    }
  });
  if (
		serving_qty > 1 &&
		!serving_unit.includes('oz') &&
		!serving_unit.includes('gr') &&
		food_name.lastIndexOf('s') !== food_name.length - 1 &&
		unitArray[0].lastIndexOf('s') !== unitArray[0].length - 1
	) {
		food_name = food_name + 's';
	}
  let description = `${serving_qty} ${serving_unit} ${food_name}`;
  if (food_name === serving_unit) {
    description = `${serving_qty} ${food_name}`;
  }

  return (
    <div
      id={props.id}
      className={classes.JournalEntry}
      onClick={props.deleteRequestHandler}
    >
      <p>{consumed_at}</p>
      <p>{description}</p>
    </div>
  );
};
JournalEntry.propTypes = {
  deleteRequest: PropTypes.bool,
  deleteRequestHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  time: PropTypes.string,
  description: PropTypes.string,
  calories: PropTypes.number,
  id: PropTypes.number,
};

export default JournalEntry;
