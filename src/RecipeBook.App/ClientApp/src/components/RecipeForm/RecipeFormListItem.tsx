import React, {
  ChangeEventHandler,
  MouseEventHandler,
  ReactElement,
} from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  ingredient?: string;
  unit?: string;
  quantity?: number;
  instruction?: string;
  position?: number;
  id: number;
  onRemove: MouseEventHandler<HTMLButtonElement>;
  onTextChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export default function RecipeFormListItem({
  ingredient,
  unit,
  quantity,
  instruction,
  position,
  id,
  onRemove,
  onTextChange,
}: Props): ReactElement {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      marginTop: "1em",
      justifyContent: "center",
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
    textPosition: {
      alignSelf: "center",
      textAlign: "center",
      width: "10%",
      margin: "0.2em",
    },
    buttonDelete: {
      alignSeld: "center",
      margin: "0.2em",
      width: "5%",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      {ingredient !== undefined && (
        <>
          <TextField
            id="outlined-basic"
            name={"ingredient_" + id + "_" + "quantity"}
            defaultValue={quantity ? quantity : ""}
            label="Quantity *"
            variant="standard"
            style={styles.textFieldQuantity}
            onChange={(e) => onTextChange(e)}
          />
          <TextField
            id="outlined-basic"
            name={"ingredient_" + id + "_" + "unit"}
            defaultValue={unit}
            label="Unit *"
            variant="standard"
            style={styles.textFieldUnit}
            onChange={(e) => onTextChange(e)}
          />
          <TextField
            id="outlined-basic"
            name={"ingredient_" + id + "_" + "ingredient"}
            defaultValue={ingredient}
            label="Name *"
            variant="standard"
            style={styles.textFieldIngredient}
            onChange={(e) => onTextChange(e)}
          />
        </>
      )}
      {instruction !== undefined && (
        <>
          <Typography sx={styles.textPosition} variant="subtitle2">
            #{position}
          </Typography>
          <TextField
            id="outlined-basic"
            name={"instruction_" + id}
            defaultValue={instruction}
            label="Instruction *"
            variant="standard"
            style={styles.textFieldInstruction}
            onChange={(e) => onTextChange(e)}
          />
        </>
      )}
      <Button
        type="submit"
        color="secondary"
        style={styles.buttonDelete}
        variant="text"
        onClick={onRemove}
      >
        <CloseIcon />
      </Button>
    </Box>
  );
}
