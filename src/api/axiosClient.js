import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    accept: "application/json",
    Authorization: `${process.env.REACT_APP_API_TOKEN}`,
  },
});

const liveFeedEndpoint = "livefeed/fetch-livefeed";
const cameraFetchEndpoint = "camera/get_names";

const userListEndpoint = "http://localhost:3000/api/users";
const userDetailEndpoint = (id) => `http://localhost:3000/api/users/${id}`;
const createUserEndpoint = "http://localhost:3000/api/users";
export const updateUserEndpoint = (id) => `http://localhost:3000/api/users/${id}`;
export const deleteUserEndpoint = (id) => `http://localhost:3000/api/users/${id}`;

 const fetchAllowedActions = async () => {
  const response = await axiosClient.get("http://localhost:3000/api/allowed-actions");
  return response.data; 
};

 const fetchAllowedPages = async () => {
  const response = await axiosClient.get("http://localhost:3000/api/allowed-pages");
  return response.data; 
};

export {
  axiosClient,
  liveFeedEndpoint,
  cameraFetchEndpoint,
  userListEndpoint,
  userDetailEndpoint,
  createUserEndpoint, 
  fetchAllowedActions ,
  fetchAllowedPages
};
