import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_TMDB_API,
    language: "en-US",
  },
});

api.get("tv/popular");

export default api;
