import React, { ReactElement, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { RouterProps, useHistory, useParams } from "react-router-dom";
import { Recipe } from "../Types";

import RecipeCheckboxItem from "../components/RecipeCheckboxItem";
import { getRecipe } from "../utility/Api/recipe";
import { AxiosResponse } from "axios";

export default function ViewRecipe(): ReactElement {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  // const recipe = recipes.find((r: Recipe) => r.id === id);

  useEffect(() => {
    getRecipe(id, (res: AxiosResponse<any>) => {
      if (res && res.status == 200) {
        setRecipe(res.data as Recipe);
      } else {
        history.push("/");
      }
    });
  }, []);

  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
    },
    recipeContainer: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "1000px",
      width: "100%",
      height: "100%",
      border: "1px solid #eee",
    },
    img: {
      width: "100%",
      height: "30vh",
      minHeight: "30vh",
      objectFit: "cover",
    },
    recipeTextContainer: {
      height: "100%",
      padding: "1em",
    },
    title: {
      marginTop: "1em",
      marginBottom: "2em",
    },
    subtitle: {
      marginTop: "1em",
    },
    listContainer: {
      marginLeft: "2em",
    },
    button: {
      width: 20,
      alignSelf: "flex-end",
      margin: "1em",
    },
  } as const;

  const handleOnEditClick = (recipe: Recipe) => {
    history.push("/edit/" + recipe.id);
  };

  return (
    <Box sx={styles.container}>
      {recipe && (
        <Box sx={styles.recipeContainer}>
          <img src={recipe.logo} style={styles.img} />
          <Box sx={styles.recipeTextContainer}>
            <Typography variant="h6">{recipe.title}</Typography>
            <Typography sx={styles.title} variant="body1">
              {recipe.description}
            </Typography>
            <Typography sx={styles.subtitle} variant="subtitle2">
              Ingredients:
            </Typography>
            <Box sx={styles.listContainer}>
              {recipe.ingredients.map((item, i) => (
                <RecipeCheckboxItem key={i} ingredient={item} />
              ))}
            </Box>
            <Typography sx={styles.subtitle} variant="subtitle2">
              Instructions:
            </Typography>
            <Box sx={styles.listContainer}>
              {recipe.instructions.map((item, i) => (
                <RecipeCheckboxItem key={i} instruction={item} />
              ))}
            </Box>
          </Box>
          <Button
            style={styles.button}
            variant="contained"
            onClick={() => handleOnEditClick(recipe)}
          >
            edit
          </Button>
        </Box>
      )}
    </Box>
  );
}
