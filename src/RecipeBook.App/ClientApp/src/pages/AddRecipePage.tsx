import React, { ReactElement, useState } from "react";
import { Box, Typography } from "@mui/material";
import { v4 } from "uuid";

import { Recipe } from "../Types";
import RecipeForm from "../components/RecipeForm/RecipeForm";
interface Props {}

export default function AddRecipePage({}: Props): ReactElement {
  const emptyRecipe = {
    id: v4(),
    title: "",
    description: "",
    logo: "",
    createdDate: Date.now().toString(),
    ingredients: [],
    instructions: [],
  };
  const [recipe, setRecipe] = useState<Recipe | undefined>(
    emptyRecipe as Recipe
  );
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

  return (
    <Box sx={styles.container}>
      <Box sx={styles.recipeContainer}>
        <Typography variant="h5" sx={styles.title}>
          Add Recipe!
        </Typography>
        <RecipeForm recipe={recipe} onUpdateRecipe={setRecipe} />
      </Box>
    </Box>
  );
}
