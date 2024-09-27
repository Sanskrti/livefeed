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

const userListEndpoint = "/api/users";
const userDetailEndpoint = (id) => `/api/users/${id}`;
const createUserEndpoint = "/api/users";
export const updateUserEndpoint = (id) => `/api/users/${id}`;
export const deleteUserEndpoint = (id) => `/api/users/${id}`;

 const fetchAllowedActions = async () => {
  const response = await axiosClient.get("/api/allowed-actions");
  return response.data; 
};

 const fetchAllowedPages = async () => {
  const response = await axiosClient.get("/api/allowed-pages");
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
