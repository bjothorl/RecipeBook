import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import ListContainer from "../components/list/ListContainer";

export default function RecipesPage(props) {
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
  };

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text} variant="h5">
        Here are your recipes
      </Typography>
      <ListContainer
        data={props.recipes}
        itemSize={{ height: 400, width: 300 }}
      />
    </Box>
  );
}
