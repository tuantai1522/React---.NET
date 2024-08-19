import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import router from "../router/Routes";
import { URLSearchParams } from "url";
import { PaginatedReponse } from "../models/pagination";

axios.defaults.baseURL = "http://localhost:5062/api/";
axios.defaults.withCredentials = true;

//to return data from response
const responseBody = (response: AxiosResponse) => response.data;

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.interceptors.response.use(
  async (res) => {
    await sleep();

    const pagination = res.headers["pagination"];
    if (pagination) {
      res.data = new PaginatedReponse(res.data, JSON.parse(pagination));
      return res;
    }
    return res;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    if (data.errors) {
      const arrayErrors: string[] = [];
      for (const key in data.errors) {
        if (data.errors[key]) arrayErrors.push(data.errors[key]);
      }
      console.log(arrayErrors.flat());
      throw arrayErrors.flat();
    }
    if (status == 400 || status == 401 || status == 404) {
      toast.error(data.title);
    }

    //error related to server
    console.log(data.error);
    router.navigate("/server-error", { state: { error: data } });

    if (status == 500) {
    }

    return Promise.reject(error.response);
  }
);
const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),

  //send data to server, it's in the body of request
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),

  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Catalog = {
  list: (params: URLSearchParams) => requests.get("product", params),
  details: (id: number) => requests.get(`product/${id}`),
  filters: () => requests.get(`product/filters`),
};

const TestErrors = {
  get404Error: () => requests.get("buggy/not-found"),
  get400Error: () => requests.get("buggy/bad-request"),
  get401Error: () => requests.get("buggy/unauthorised"),
  getValidationError: () => requests.get("buggy/validation-error"),
  get500Error: () => requests.get("buggy/server-error"),
};

//Working with API
const Cart = {
  get: () => requests.get("Cart"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`Cart?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`Cart?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  Catalog,
  TestErrors,
  Cart,
};

export default agent;
