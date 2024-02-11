// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AlertContext } from "../context/AlertContext";
import { useLoader } from "./../hooks/useLoader";
import axios, { AxiosError, AxiosResponse } from "axios";

import {
  ApiErrorResponse,
  AuthInterface,
  TokenResponse,
} from "./../interfaces/AuthInterface";
import { useAuth } from "./../context/AuthContext";
import { Endpoints } from "./routes";

export const useRequest = () => {
  //const { addAlert } = useContext(AlertContext);
  const { showLoader, hideLoader } = useLoader();

  //#region AxiosConfig

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const {  login,  UserData, isAuthenticated } = useAuth();
  // Create an axios instance for the UserData endpoint
  const ApiTokenRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.Api + Endpoints.login,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    method: "POST",
  });

  // Create an axios instance for the other endpoints
  const ApiRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.Api,
    headers: {
      "Content-Type": "application/json",
      ...(UserData?.access_token !== ""  && UserData?.access_token !==undefined? { Authorization: `Bearer ${UserData?.access_token}` } : {}),
    },
  });


  const ApiPostFileRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.Api,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${UserData?.access_token}`,
    },
  });


  const getRequest = async <T extends unknown>(
    endpoint: string,
    params?: object,
  ): Promise<T> => {
    showLoader();
    return await ApiRequest.get(endpoint, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  const postRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<T> => {
    console.log("post??");
    showLoader();
    return await ApiRequest.post(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };
  const putRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<T> => {
    showLoader();
    return await ApiRequest.put(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };
  const postRequestToken = async <T extends TokenResponse>(
    data: AuthInterface
  ): Promise<T> => {
    showLoader();
    return await ApiTokenRequest.request({
      data,
    })
      .then(({ data }: AxiosResponse<T>) => {
        login(data);
        console.log(data);
        return data;
      })
      .catch((error: AxiosError<ApiErrorResponse>) => {
        console.log(JSON.stringify(error, null, 3));
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  const postFileRequest = async <T extends unknown>(
    endpoint: string,
    data?: object,
    params?: object
  ): Promise<T> => {
    showLoader();
    return await ApiPostFileRequest.post(endpoint, data, { params })
      .then(({ data }: AxiosResponse<T>) => data)
      .catch((error: AxiosError<ApiErrorResponse>) => {
        //console.error(JSON.stringify(error, null, 3));
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  return { 
    getRequest,
    postRequestToken, 
    postRequest, 
    postFileRequest,
    putRequest 
  };
};
