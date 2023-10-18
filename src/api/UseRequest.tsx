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

  const {  login,  token } = useAuth();
  // Create an axios instance for the token endpoint
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
      ...(token !== "" ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  // // Interceptar las solicitudes para agregar el token si el usuario está autenticado
  // ApiRequest.interceptors.request.use((config) => {
  //   if (isAuthenticated && token) {
  //     config.headers["Authorization"] = `Bearer ${token}`;
  //   }
  //   return config;
  // });
  const ApiPostFileRequest = axios.create({
    baseURL: Endpoints.BaseURL + Endpoints.Api,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      otherHeader: "foo",
    },
  });

  //#endregion

  //#region RequestConfig

  const getRequest = async <T extends unknown>(
    endpoint: string,
    params?: object,
    isLoading?: boolean
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

  const postRequestToken = async <T extends TokenResponse>(
    data: AuthInterface
  ): Promise<T> => {
    showLoader();
    return await ApiTokenRequest.request({
      data,
    })
      .then(({ data }: AxiosResponse<T>) => {
        login(data.access_token);
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
        console.error(JSON.stringify(error, null, 3));
        //ShowAlertApiError(error);
        throw error;
      })
      .finally(() => {
        hideLoader();
      });
  };

  //#endregion

  return { getRequest, postRequestToken, postRequest, postFileRequest };
};
