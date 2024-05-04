import { createContext } from "react";
import Axios, { AxiosInstance } from "axios";
import { notification } from "antd";
import { useContext } from "react";
import { useMutation } from "react-query";

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "",
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  // Read token for anywhere, in this case directly from localStorage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["X-Access-Token"] = `${token}`;
  }

  return config;
});

// response interceptor
axios.interceptors.response.use(
  (response) => {
    const data = response.data;
    if (response.status === 200) {
      return data;
    }

    notification.error({
      message: `请求错误 ${response.statusText}: ${response}`,
      description: data || response.statusText || "Error",
    });

    if (response.status === 401) {
      window.location.href = "/login";
    }

    return Promise.reject(new Error(response.statusText || "Error"));
  },
  (error) => {
    console.log(error.response);
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/login";
          break;
        case 404:
          notification.error({
            message: `请求不存在`,
            description: error.response.data?.msg || "Error",
          });
          break;
        case 406:
          notification.error({
            message: `请求参数有误`,
            description: error.response.data?.msg || "Error",
          });
          break;
        default:
          notification.error({
            message: `请求错误`,
            description: error.response.data?.msg || "Error",
          });
      }
    }

    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
    get: () => {
      throw new Error("You must wrap your component in an AxiosProvider");
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

export const usePost = <T, U>(url: string) => {
  return useMutation(async (params: T) => {
    const data: U = await axios.post(`${url}`, params);
    return data;
  });
};

export const useGet = <U>(url: string) => {
  return useMutation(async () => {
    const data: U = await axios.get(`${url}`, { data: {} });
    return data;
  });
};

export default axios;
