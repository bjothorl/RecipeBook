import React, { ReactElement } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

export default function ViewRecipe(): ReactElement {
  let { id } = useParams<{ id: string }>();

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
        View Recipe: {id}
      </Typography>
    </Box>
  );
}
