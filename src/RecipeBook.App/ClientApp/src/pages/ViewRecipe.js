import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ViewRecipe(props) {
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
  };
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text} variant="h5">
        View Recipe: {props.match.params.id}
      </Typography>
    </Box>
  );
}
