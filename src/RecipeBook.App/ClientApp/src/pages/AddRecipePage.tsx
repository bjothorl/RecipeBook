import React, { FormEvent, ReactElement, useState } from "react";
import { Box, Typography } from "@mui/material";
import { v4 } from "uuid";
import { useHistory } from "react-router-dom";
import { Recipe } from "../Types";
import RecipeForm from "../components/RecipeForm/RecipeForm";
import { postRecipe } from "../utility/api";
interface Props {}

export default function AddRecipePage({}: Props): ReactElement {
  let history = useHistory();

  const emptyRecipe = {
    id: v4(),
    title: "",
    description: "",
    logo: "",
    ingredients: [],
    instructions: [],
  };
  const [recipe, setRecipe] = useState<Recipe | undefined>(
    emptyRecipe as Recipe
  );

  const handleSubmit = (event: FormEvent, blob?: string) => {
    event.preventDefault();

    const data = {
      ...recipe,
      logo: blob,
    } as Recipe;

    postRecipe(data, (res: any) => {
      console.log(res);
    });
  };

  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
    },
    recipeContainer: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "1000px",
      width: "100%",
      height: "100%",
      border: "1px solid #eee",
    },
    title: {
      marginTop: "1em",
      alignSelf: "center",
    },
  } as const;

  const handleCancel = () => {
    history.push("/recipes");
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.recipeContainer}>
        <Typography variant="h5" sx={styles.title}>
          Add Recipe!
        </Typography>
        <RecipeForm
          recipe={recipe}
          onUpdateRecipe={setRecipe}
          onSubmit={handleSubmit}
          onDelete={handleCancel}
          type={"add"}
        />
      </Box>
    </Box>
  );
}
