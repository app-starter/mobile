import { BASEAPIURL } from "./constants";
import Axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStore from "../../stores/AuthStore";
const api_url = process.env.REACT_APP_API_URL;
class Api {
  getBaseUrl() {
    return api_url || BASEAPIURL;
  }
   

  

   getApi() {
    
    const axiosInstance = Axios.create({
      baseURL: BASEAPIURL,
      headers: {
        Accept: "application/json",
        Authorization:   `Bearer ${AuthStore.token}` ,
      },
    });
    axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
   

    return axiosInstance;
  }
  getApiWithoutToken() {
    const axiosInstance = Axios.create({
      baseURL: BASEAPIURL,
      headers: {
        Accept: "application/json",
      },
    });

    return axiosInstance;
  }
}
export default new Api();
