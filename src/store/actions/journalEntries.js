import * as actionTypes from "./actionTypes";
import axios from "../../axios-journalEntries";

export const entryDelete = (id) => {
  return {
    type: actionTypes.DELETE_ENTRY,
    entryID: id,
  };
};

export const dbUpdate = (token, userId, curEntries, id) => {
  return (dispatch) => {
    dispatch(entryDelete(id));
    const deletedEntry = curEntries.filter(
      (entry, i) => entry.consumed_at === id
    );
    const dbKey = deletedEntry[0].dbKey;
    axios
      .delete(
        `https://grayt-fitness.firebaseio.com/journalEntries/${dbKey}.json?auth=${token}`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setEntries = (entries) => {
  return {
    type: actionTypes.SET_ENTRIES,
    entries: entries,
  };
};

export const fetchEntriesFailed = () => {
  return {
    type: actionTypes.FETCH_ENTRIES_FAILED,
  };
};

export const initEntries = (token, userId) => {
  return (dispatch) => {
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get(
        "https://grayt-fitness.firebaseio.com/journalEntries.json" + queryParams
      )
      .then((response) => {
        const curJournalEntries = [];
        for (let entryKey in response.data) {
          response.data[entryKey].journalEntry.dbKey = `${entryKey}`;
          curJournalEntries.push(response.data[entryKey].journalEntry);
        }
        dispatch(setEntries(curJournalEntries));
      })
      .catch((err) => {
        dispatch(fetchEntriesFailed());
      });
  };
};
