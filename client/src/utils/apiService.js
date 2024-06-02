import axios from "axios";

export const registerUser = async ({ name, password, email }) => {
  const uri = "http://localhost:8000/api/user/register";

  return axios.post(uri, {
    name,
    password,
    email,
  });
};

export const loginUser = async ({ email, password }) => {
  const uri = "http://localhost:8000/api/user/login";

  return axios.post(uri, {
    password,
    email,
  });
};

export const fetchUserChatsAPI = async (userId) => {
  const uri = `http://localhost:8000/api/chat/findAll/${userId}`;

  return axios.get(uri);
};

export const fetchUserDetails = async (userId) => {
  const uri = `http://localhost:8000/api/user//${userId}`;

  return axios.get(uri);
};
