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

export const fetchChats = async (chatId) => {
  const uri = `http://localhost:8000/api/message/${chatId}`;

  return axios.get(uri);
};

export const postCreateMessage = async (req) => {
  const uri = "http://localhost:8000/api/message/createMessage";

  return axios.post(uri, req);
};

export const fetchUsers = async () => {
  const uri = "http://localhost:8000/api/user";

  return axios.get(uri);
};

export const createNewChat = async (reqBody) => {
  const uri = "http://localhost:8000/api/chat/createChat";
  console.log(reqBody);
  return axios.post(uri, reqBody);
};
