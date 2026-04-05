import axios from "axios";

// const { API_URL } = require("../config/next.config");

const API_CALL = axios.create({
  // baseURL: process.env.API_URL,
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API_CALL;
