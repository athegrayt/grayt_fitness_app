import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userInfo: {},
  error: false,
  loading: false,
  path: null,
  fetched: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_INFO_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        error: false,
        loading: false,
        fetched: true,
      };
    case actionTypes.FETCH_INFO_FAIL:
      return {
        ...state,
        error: true,
      };
    case actionTypes.SET_INFO_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SET_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.userInfo,
        loading: false,
      };
    case actionTypes.SET_INFO_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return {
        ...state,
        path: action.path,
      };
    default:
      return state;
  }
};

export default reducer;
