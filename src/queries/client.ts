import axios from "axios";

// TODO 조금 더 찾아보기
/**
 * withCredentials: true를 하지 않으면 서버로 쿠키를 보내지 않아 401 
 * 
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

export default client;