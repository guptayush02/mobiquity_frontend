import Axios from "axios";
import { toast } from "react-toastify";
import config from '../constants/config'

Axios.defaults.baseURL = config.API_URL

const request = ({ method = "get", url, data, params, extra }) => {
  return new Promise((resolve, reject) => {
    const config = { url, method, ...extra };
    const token = JSON.parse(localStorage.getItem("user") || "{}").token;
    if (token) config.headers = { Authorization: `Bearer ${token}` };
    if (!["GET", "get"].includes(method) && data) config.data = data;
    if (params) config.params = params;
    Axios({ ...config })
      .then(response => resolve(response.data))
      .catch(async e => {
        if (e.response.status === 401 && e.response.data === "You have been blocked!")
          toast.error(e.response.data);
        else if (["get"].includes(method)) toast.error("Something went wrong!");
        reject(e);
      });
  });
};

export const signup = (data) => {
  return request({
    method: "post",
    url: "/api/v1/signup",
    data
  });
};

export const login = (data) => {
  return request({
    method: "post",
    url: "/api/v1/login",
    data
  });
}

export const getFiles = () => {
  return request({
    method: "get",
    url: "/api/v1/files"
  });
}

export const fileUpload = (data) => {
  return request({
    method: "post",
    url: "/api/v1/upload-file",
    data
  })
}

export const deleteFile = (id) => {
  return request({
    method: "delete",
    url: `/api/v1/file/${id}`
  })
}
