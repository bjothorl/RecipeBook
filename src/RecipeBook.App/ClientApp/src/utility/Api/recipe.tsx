import axios, { AxiosError, AxiosResponse } from "axios";
import { Recipe } from "../../Types";

let connStr = "https://localhost:5401/api/recipe/";

function auth() {
  let token = localStorage.getItem("token");
  if (token === null) {
    return "";
  } else return token;
}

function getRecipes(callback: Function): void {
  axios
    .get(connStr, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res: AxiosResponse<any>) => {
      callback(res);
    })
    .catch((err: AxiosError) => {
      callback(err.response);
    });
}

function getRecipe(recipeId: string, callback: Function): void {
  axios
    .get(connStr + recipeId, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res: AxiosResponse<any>) => {
      callback(res);
    })
    .catch((err: AxiosError) => {
      callback(err.response);
    });
}

function postRecipe(data: Recipe, callback: Function) {
  axios
    .post(connStr, data, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res: AxiosResponse<any>) => {
      callback(res);
    })
    .catch((err: AxiosError) => {
      callback(err.response);
    });
}

function editRecipe(data: Recipe, callback: Function) {
  axios
    .put(connStr, data, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res: AxiosResponse<any>) => {
      callback(res);
    })
    .catch((err: AxiosError) => {
      callback(err.response);
    });
}

function deleteRecipe(recipeId: string, callback: Function): void {
  axios
    .delete(connStr + recipeId, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res: AxiosResponse<any>) => {
      callback(res);
    })
    .catch((err: AxiosError) => {
      callback(err.response);
    });
}

export { getRecipes, getRecipe, postRecipe, editRecipe, deleteRecipe };
