import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function ListContainer({ data, columns, itemSize }) {
  const styles = {
    img: {
      background: "lightgrey",
      width: "100%",
      height: "60%",
      objectFit: "cover",
    },
    recipeBox: {
      minWidth: itemSize,
      height: itemSize,
      background: "grey",
      margin: "2em",
    },
    recipeContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      flexWrap: "wrap",
    },
  };

  return (
    <Box style={styles.recipeContainer}>
      {data.map((recipe) => (
        <Box sx={styles.recipeBox}>
          <img src={recipe.logo} style={styles.img} />
          <Typography variant="h6">{recipe.title}</Typography>
        </Box>
      ))}
    </Box>
  );
}
