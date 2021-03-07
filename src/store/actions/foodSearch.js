import * as actionTypes from "./actionTypes";
import axios from "../../axios-journalEntries";

export const addEntrySuccess = (entry) => {
  return {
    type: actionTypes.ADD_ENTRY_SUCCESS,
    entry: entry.journalEntry,
  };
};

export const addEntryFail = () => {
  return {
    type: actionTypes.ADD_ENTRY_FAIL,
  };
};

export const addEntry = (entry, token) => {
  return (dispatch) => {
    axios
      .post("/journalEntries.json?auth=" + token, entry)
      .then((res) => {
        dispatch(addEntrySuccess(entry));
      })
      .catch((error) => {
        dispatch(addEntryFail());
      });
  };
};
