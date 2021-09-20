import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import data from "../assets/fakeData.json";

export default function RecipesPage() {
  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "1em",
    },
    img: {
      background: "lightgrey",
      width: "100%",
      height: "60%",
      objectFit: "cover",
    },
    recipeBox: {
      minWidth: "400px",
      height: "400px",
      background: "grey",
      margin: "2em",
    },
    recipeContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      justifyContent: "center",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h3">Recipes</Typography>
      <Box style={styles.recipeContainer}>
        {data.map((recipe) => (
          <Box sx={styles.recipeBox}>
            <img src={recipe.logo} style={styles.img} />
            <Typography variant="h6">{recipe.title}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
