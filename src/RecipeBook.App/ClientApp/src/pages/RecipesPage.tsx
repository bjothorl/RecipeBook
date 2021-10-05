import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Recipe } from "../Types";
import RecipeList from "../components/RecipeList/RecipeList";

interface Props {
  recipes: Recipe[];
}

export default function RecipesPage({ recipes }: Props): ReactElement {
  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
    },
    text: {
      margin: "1em",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text} variant="h5">
        All recipes:
      </Typography>
      <RecipeList data={recipes} itemSize={{ height: 400, width: 300 }} />
    </Box>
  );
}
