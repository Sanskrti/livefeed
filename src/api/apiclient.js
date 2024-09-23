import axios from 'axios';
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  headers: {
    accept: 'application/json', 
    Authorization: `${process.env.REACT_APP_API_TOKEN}`, 
  },
});

const liveFeedEndpoint ="livefeed/fetch-livefeed";
const cameraFetchEndpoint ="camera/get_names";
const userListEndpoint ='http://localhost:3000/api/users';


export { apiClient , liveFeedEndpoint, cameraFetchEndpoint, userListEndpoint}
