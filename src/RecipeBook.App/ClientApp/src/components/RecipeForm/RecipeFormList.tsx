import { Box, Typography } from "@mui/material";
import React, { ReactElement } from "react";

import RecipeFormListItem from "./RecipeFormListItem";
import { Recipe } from "../../Types";

interface Props {
  recipe: Recipe;
}

export default function RecipeFormList({ recipe }: Props): ReactElement {
  const styles = {
    container: {
      flex: 1,
      height: "100px",
      width: "100%",
      marginTop: "1em",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      {recipe.ingredients && (
        <>
          <Typography>Ingredients</Typography>
          {recipe.ingredients.map(({ ingredient, unit, quantity }, i) => (
            <RecipeFormListItem
              key={i}
              ingredient={ingredient}
              unit={unit}
              quantity={quantity}
            />
          ))}
        </>
      )}
      {recipe.instructions && (
        <>
          <Typography>Instructions</Typography>
          {recipe.instructions.map(({ instruction }, i) => (
            <RecipeFormListItem
              key={i}
              instruction={instruction}
              position={i}
            />
          ))}
        </>
      )}
    </Box>
  );
}
