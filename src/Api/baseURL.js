import axios from "axios";

// Production builds set REACT_APP_API_URL (see .env.example); local development keeps the old default.
const baseUrl = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});

export default baseUrl;
