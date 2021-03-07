import axios from "axios";

const instance = axios.post({
  baseURL: "https://trackapi.nutritionix.com/",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-app-id": "5876afdb",
    "x-app-key": process.env.REACT_APP_API_KEY2,
  },
});

export default instance;
