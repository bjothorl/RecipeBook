import axios from "axios";
import { Recipe } from "../Types";

function getRecipes(callback: Function): void {
  axios
    .get("https://localhost:5401/api/recipe", {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYmYiOjE2MzM1MTU5NjAsImV4cCI6MTYzNDEyMDc1OCwiaWF0IjoxNjMzNTE1OTYwfQ.uUv6RYedx0FOBP2FGqJT8Jx2x_0zTqGxPB1kE09JsXg",
      },
    })
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
