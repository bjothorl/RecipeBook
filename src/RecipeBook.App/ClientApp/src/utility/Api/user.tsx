import axios, { AxiosError, AxiosResponse } from "axios";

let connStr = "https://localhost:44373/api/user";

function loginUser(data: any, callback: Function) {
  axios
    .post(connStr + "/authenticate", data)
    .then((res: AxiosResponse<any>) => {
      callback(res);
      localStorage.setItem("token", res.data.token);
    })
    .catch((err: AxiosError) => {
      callback(err.response);
    });
}

function registerUser(data: any, callback: Function) {
  axios
    .post(connStr + "/register", data)
    .then((res: AxiosResponse<any>) => {
      callback(res);
    })
    .catch((err: AxiosError) => {
      callback(err.response);
    });
}

export { registerUser, loginUser };
