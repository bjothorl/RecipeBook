import React, { ReactElement } from "react";
import { Checkbox, Typography } from "@mui/material";
import { Ingredient, Instruction } from "../../Types";
import { Box } from "@mui/system";
interface Props {
  ingredient?: Ingredient;
  instruction?: Instruction;
}

export default function RecipeItem({
  ingredient,
  instruction,
}: Props): ReactElement {
  const styles = {
    container: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: "1px solid #ccc",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      {ingredient && (
        <>
          <Typography>
            {ingredient.ordinalPosition}. ({ingredient.quantity}{" "}
            {ingredient.unit}) - {ingredient.ingredient}
          </Typography>
          <Checkbox />
        </>
      )}
      {instruction && (
        <>
          <Typography>
            {instruction.ordinalPosition}. {instruction.instruction}
          </Typography>
          <Checkbox />
        </>
      )}
    </Box>
  );
}
