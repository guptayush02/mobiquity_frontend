import Axios from "axios";
import { toast } from "react-toastify";
import config from '../constants/config'

Axios.defaults.baseURL = config.API_URL

export const fileUpload = formData => {
  return Axios.post('/api/v1/upload-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      token: localStorage.getItem('token')
    },
  }).then(response => response.data)
}

const request = ({ method = "get", url, data, params, extra }) => {
  return new Promise((resolve, reject) => {
    const config = { url, method, ...extra };
    const token = localStorage.getItem('token');
    if (token) config.headers = { token: `${token}` };
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

export const getAtmList = (city) => {
  return request({
    method: "get",
    url: `/api/v1/atm-lists?city=${city}`
  });
}

export const deleteAtm = (id) => {
  return request({
    method: "delete",
    url: `/api/v1/atm/${id}`
  })
}

export const createAtm = (data) => {
  return request({
    method: "post",
    url: `/api/v1/atm`,
    data
  })
}

export const updateAtm = (data, id) => {
  return request({
    method: "put",
    url: `/api/v1/atm/${id}`,
    data
  })
}

export const citiesList = () => {
  return request({
    method: "get",
    url: `/api/v1/city-list`
  });
}
