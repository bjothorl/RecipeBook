import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Recipe } from "../Types";
import RecipeList from "../components/list/RecipeList";
import { RouterProps } from "react-router";

interface Props {
  props: RouterProps;
  recipes: Recipe[];
}

export default function RecipesPage({ props, recipes }: Props): ReactElement {
  console.log(props);

  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
    },
    text: {
      margin: "1em",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text} variant="h5">
        Here are your recipes
      </Typography>
      <RecipeList data={recipes} itemSize={{ height: 400, width: 300 }} />
    </Box>
  );
}
