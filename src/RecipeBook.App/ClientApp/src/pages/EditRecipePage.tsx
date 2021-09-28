import React, { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Recipe } from "../Types";
import RecipeForm from "../components/RecipeForm/RecipeForm";
interface Props {
  recipes: Recipe[];
}
export default function EditRecipePage({ recipes }: Props): ReactElement {
  const { id } = useParams<{ id: string }>();
  const rec = recipes.find((r: Recipe) => r.id === id);
  const [recipe, setRecipe] = useState<Recipe | undefined>(rec);
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

  if (recipe)
    return (
      <Box sx={styles.container}>
        <Box sx={styles.recipeContainer}>
          <Typography variant="h5" sx={styles.title}>
            Edit {recipe.title}
          </Typography>
          <RecipeForm recipe={recipe} onUpdateRecipe={setRecipe} />
        </Box>
      </Box>
    );
  else return <>no recipe</>;
}
