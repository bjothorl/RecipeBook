import React, { ChangeEventHandler, ReactElement } from "react";
import { Box, Button, Typography } from "@mui/material";
import { v4 } from "uuid";
import RecipeFormListItem from "./RecipeFormListItem";
import { Recipe } from "../../Types";

interface Props {
  recipe: Recipe;
  onRemoveIngredient: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ordinalPosition: number
  ) => void;
  onRemoveInstruction: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ordinalPosition: number
  ) => void;
  onAddIngredient: React.MouseEventHandler;
  onAddInstruction: React.MouseEventHandler;
  onTextChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  ingredientKeys: string[];
  instructionKeys: string[];
}

export default function RecipeFormList({
  recipe,
  onRemoveIngredient,
  onRemoveInstruction,
  onAddIngredient,
  onAddInstruction,
  onTextChange,
  ingredientKeys,
  instructionKeys,
}: Props): ReactElement {
  const styles = {
    container: {
      flex: 1,
      height: "100px",
      width: "100%",
      marginTop: "1em",
      display: "flex",
      flexDirection: "column",
    },
    subtitle: {
      marginTop: "1em",
    },
    button: {
      marginTop: "1em",
      width: "20%",
      alignSelf: "flex-end",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      {recipe.ingredients && (
        <>
          <Typography sx={styles.subtitle} variant="subtitle2">
            Ingredients
          </Typography>
          {recipe.ingredients.map(
            ({ ingredient, unit, quantity, ordinalPosition }, i) => (
              <RecipeFormListItem
                key={ingredientKeys[i]}
                id={i}
                ingredient={ingredient}
                unit={unit}
                quantity={quantity ? quantity : undefined}
                position={ordinalPosition}
                onRemove={(e) => onRemoveIngredient(e, ordinalPosition)}
                onTextChange={onTextChange}
              />
            )
          )}
          <Button
            sx={styles.button}
            variant="outlined"
            onClick={onAddIngredient}
          >
            + add ingredient
          </Button>
        </>
      )}
      {recipe.instructions && (
        <>
          <Typography sx={styles.subtitle} variant="subtitle2">
            Instructions
          </Typography>
          {recipe.instructions.map(({ instruction, ordinalPosition }, i) => (
            <RecipeFormListItem
              key={instructionKeys[i]}
              id={i}
              instruction={instruction}
              position={ordinalPosition}
              onRemove={(e) => onRemoveInstruction(e, ordinalPosition)}
              onTextChange={onTextChange}
            />
          ))}
          <Button
            sx={styles.button}
            variant="outlined"
            onClick={onAddInstruction}
          >
            + add instruction
          </Button>
        </>
      )}
    </Box>
  );
}
