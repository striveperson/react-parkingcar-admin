import axios, { AxiosError } from "axios";

// TODO 조금 더 찾아보기
/**
 * withCredentials: true를 하지 않으면 서버로 쿠키를 보내지 않아 401 
 * 
 */
const client = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

client.interceptors.response.use(
  response => response,
  (error: Error | AxiosError) => {
    console.log(error)
    if (!axios.isAxiosError(error)) {
      return;
    }

    if (error.response?.status === 401) {
      window.location.replace('/sign-in');
      localStorage.clear();
    }

    return Promise.reject(error);
  }

)

export default client;