import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { ReactElement } from "react";
import { Recipe } from "../Types";

interface Props {
  recipes: Recipe[];
}

export default function EditRecipePage({ recipes }: Props): ReactElement {
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
      <Typography variant="h5">Edit Your Recipe</Typography>
    </Box>
  );
}
