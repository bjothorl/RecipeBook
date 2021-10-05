import axios from "axios";
import { Recipe } from "../Types";

function getRecipes(callback: Function): void {
  axios
    .get("https://localhost:5401/api/recipe")
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => console.log(err));
}

function getRecipe(recipeId: string, callback: Function): void {
  axios
    .get("https://localhost:5401/api/recipe/" + recipeId)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => console.log(err));
}

function postRecipe(data: Recipe, callback: Function) {
  axios
    .post("https://localhost:5401/api/recipe", data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editRecipe(data: Recipe, callback: Function) {
  axios
    .put("https://localhost:5401/api/recipe", data)
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log("error!", err);
    });
}

function deleteRecipe(recipeId: string, callback: Function): void {
  axios
    .delete("https://localhost:5401/api/recipe/" + recipeId)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export { getRecipes, getRecipe, postRecipe, editRecipe, deleteRecipe };
