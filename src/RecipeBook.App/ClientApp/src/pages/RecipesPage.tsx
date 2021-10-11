import React, { ReactElement, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Recipe } from "../Types";
import RecipeList from "../components/RecipeList/RecipeList";
import { getRecipes } from "../utility/Api/recipe";
import { AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

export default function RecipesPage(): ReactElement {
  const [recipes, setRecipes] = useState<Recipe[]>();
  let history = useHistory();
  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
    },
    text: {
      margin: "1em",
    },
  } as const;

  useEffect(() => {
    getRecipes((res: AxiosResponse<any>) => {
      if (res && res.status == 200) {
        setRecipes(res.data as Recipe[]);
      } else {
        history.push("/");
      }
    });
  }, []);

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.text} variant="h5">
        All recipes:
      </Typography>
      {recipes && (
        <RecipeList data={recipes} itemSize={{ height: 400, width: 300 }} />
      )}
    </Box>
  );
}
