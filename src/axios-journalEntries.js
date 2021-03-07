import axios from "axios";

const instance = axios.create({
  baseURL: "https://grayt-fitness.firebaseio.com/",
});

export default instance;
