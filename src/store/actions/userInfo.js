import * as actionTypes from "./actionTypes";
import axios from "../../axios-journalEntries";

export const setCalGoal = (calGoal) => {
  return {
    type: actionTypes.SET_CAL_GOAL,
    calGoal: calGoal,
  };
};

export const fetchInfoStart = () => {
  return {
    type: actionTypes.FETCH_INFO_START,
  };
};

export const fetchInfoSuccess = (userInfo) => {
  return {
    type: actionTypes.FETCH_INFO_SUCCESS,
    userInfo: userInfo,
  };
};

export const fetchInfoFailed = () => {
  return {
    type: actionTypes.FETCH_INFO_FAIL,
  };
};

export const fetchInfo = (token, userId) => {
  return (dispatch) => {
    dispatch(fetchInfoStart());
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get("/userInfo.json" + queryParams)
      .then((response) => {
        let curUserInfo = [];
        for (let entryKey in response.data) {
          curUserInfo.push(response.data[entryKey]);
        }
        curUserInfo = curUserInfo.sort((a, b) => {
          a = new Date(a.date).getTime();
          b = new Date(b.date).getTime();
          return b - a;
        });
        dispatch(fetchInfoSuccess(curUserInfo));
      })
      .catch((err) => {
        dispatch(fetchInfoFailed());
      });
  };
};
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const setInfoStart = () => {
  return {
    type: actionTypes.SET_INFO_START,
  };
};

export const setInfoSuccess = (userInfo) => {
  return {
    type: actionTypes.SET_INFO_SUCCESS,
    userInfo: userInfo,
  };
};

export const setInfoFail = () => {
  return {
    type: actionTypes.SET_INFO_FAIL,
  };
};

export const setInfo = (userInfo, token, path) => {
  return (dispatch) => {
    dispatch(setInfoStart());
    axios
      .post("/userInfo.json?auth=" + token, userInfo)
      .then((res) => {
        dispatch(setInfoSuccess(res));
        dispatch(setAuthRedirectPath(path));
      })
      .catch((error) => {
        dispatch(setInfoFail());
      });
  };
};
