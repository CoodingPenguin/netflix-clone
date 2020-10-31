import axios from "axios";

// axios 객체 생성: TMDB api 주소를 원하는 대로 설정하여 요청을 보냄
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.REACT_APP_TMDB_API,
    language: "en-US",
  },
});

// TV 관련 데이터 요청
export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
};

// 영화 관련 데이터 요청
export const movieApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
};
