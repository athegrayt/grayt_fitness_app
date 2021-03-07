import * as actionTypes from "../actions/actionTypes";

const initialState = {
  calGoal: 2000,
  journalEntries: [],
  error: false,
  entryDelete: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ENTRY_SUCCESS:
      return {
        ...state,
        journalEntries: state.journalEntries.concat(action.entry),
      };
    case actionTypes.DELETE_ENTRY:
      return {
        ...state,
        journalEntries: state.journalEntries.filter(
          (entry, i) => entry.consumed_at !== action.entryID
        ),
        entryDelete: true,
      };
    case actionTypes.SET_ENTRIES:
      return {
        ...state,
        journalEntries: action.entries,
        error: false,
      };
    case actionTypes.FETCH_ENTRIES_FAILED:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SET_CAL_GOAL:
      return {
        ...state,
        calGoal: action.calGoal,
      };
    default:
      return state;
  }
};
export default reducer;
