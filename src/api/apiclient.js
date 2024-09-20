import axios from 'axios';


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, 
  headers: {
    accept: 'application/json', 
    Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`, 
  },
});


const liveFeedEndpoint = "/livefeed/fetch-livefeed";
const cameraFetchEndpoint = "camera/get_names";


export { apiClient , liveFeedEndpoint,cameraFetchEndpoint};
