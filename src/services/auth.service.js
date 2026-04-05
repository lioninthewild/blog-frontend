import API_CALL from "./axiosCall";

export const registerUser = async (email, password) => {
  console.log(API_CALL);
  const response = await API_CALL.post("/auth/register", { email, password });
  return response.data;
};

export const loginUser = async (email, password) => {
  const response = await API_CALL.post("/auth/login", { email, password });
  return response.data;
};
