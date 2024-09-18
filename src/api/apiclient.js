import axios from 'axios';


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  headers: {
    accept: 'application/json',
    Authorization: process.env.REACT_APP_API_TOKEN 
  }
});

const liveFeedEndpoint = process.env.REACT_APP_LIVE_FEED_ENDPOINT;
const cameraNamesEndpoint = process.env.REACT_APP_CAMERA_NAMES_ENDPOINT; 

export { apiClient, liveFeedEndpoint, cameraNamesEndpoint };
