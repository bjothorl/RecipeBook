import React, { ReactElement } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface Props {
  ingredient?: string;
  unit?: string;
  quantity?: number;
  instruction?: string;
  position?: number;
}

export default function RecipeFormListItem({
  ingredient,
  unit,
  quantity,
  instruction,
  position,
}: Props): ReactElement {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      marginTop: "1em",
    },
    textFieldIngredient: {
      width: "80%",
      margin: "0.2em",
    },
    textFieldUnit: {
      width: "10%",
      margin: "0.2em",
    },
    textFieldQuantity: {
      width: "10%",
      margin: "0.2em",
    },
    textFieldInstruction: {
      flex: 1,
      margin: "0.2em",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      {ingredient && (
        <>
          <TextField
            id="outlined-basic"
            defaultValue={quantity}
            label="Quantity *"
            variant="outlined"
            style={styles.textFieldQuantity}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            defaultValue={unit}
            label="Unit *"
            variant="outlined"
            style={styles.textFieldUnit}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            defaultValue={ingredient}
            label="Name *"
            variant="outlined"
            style={styles.textFieldIngredient}
            onChange={(e) => console.log(e.target.value)}
          />
        </>
      )}
      {instruction && (
        <>
          <Typography>{position}</Typography>
          <TextField
            id="outlined-basic"
            defaultValue={instruction}
            label="Instruction *"
            variant="outlined"
            style={styles.textFieldInstruction}
            onChange={(e) => console.log(e.target.value)}
          />
        </>
      )}
    </Box>
  );
}
