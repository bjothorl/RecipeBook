import axios from "axios";
import { Recipe } from "../../Types";

let connStr = "https://localhost:44373/api/recipe/";

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
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => console.log(err));
}

function getRecipe(recipeId: string, callback: Function): void {
  axios
    .get(connStr + recipeId, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => console.log(err));
}

function postRecipe(data: Recipe, callback: Function) {
  axios
    .post(connStr, data, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editRecipe(data: Recipe, callback: Function) {
  axios
    .put(connStr, data, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log("error!", err);
    });
}

function deleteRecipe(recipeId: string, callback: Function): void {
  axios
    .delete(connStr + recipeId, {
      headers: {
        Authorization: auth(),
      },
    })
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getRecipes, getRecipe, postRecipe, editRecipe, deleteRecipe };
