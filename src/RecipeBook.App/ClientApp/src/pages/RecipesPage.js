import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import data from "../assets/fakeData.json";
import ListContainer from "../components/list/ListContainer";

export default function RecipesPage() {
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
        Here are your recipes
      </Typography>
      <ListContainer data={data} itemSize={{ height: 400, width: 300 }} />
    </Box>
  );
}
