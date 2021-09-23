import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { Props, ReactElement } from "react";

export default function AddRecipePage({}): ReactElement {
  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      <Typography variant="h5">Add Your Recipe</Typography>
    </Box>
  );
}
