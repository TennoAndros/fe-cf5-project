import axios from "axios";
import { API_BASE_URL } from "./constants";

const booksApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

export default booksApi;
