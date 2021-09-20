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
      justifyContent: "center",
      alignItems: "center",
      padding: "1em",
    },
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h3">Recipes</Typography>
      <ListContainer data={data} itemSize={"250px"} />
    </Box>
  );
}
