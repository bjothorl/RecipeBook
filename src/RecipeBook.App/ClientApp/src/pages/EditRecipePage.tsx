import React, { ReactElement, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, FormGroup, TextField, Typography, Box } from "@mui/material";

import AddLogoImageItem from "../components/RecipeForm/AddLogoImageItem";

import ImagesUploadingTest from "../components/ImagesUploadingTest";

import { Recipe } from "../Types";

interface Props {
  recipes: Recipe[];
}

export default function EditRecipePage({ recipes }: Props): ReactElement {
  let { id } = useParams<{ id: string }>();
  let history = useHistory();
  const rec = recipes.find((r: Recipe) => r.id === id);
  const [recipe, setRecipe] = useState<Recipe | undefined>(rec);

  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      alignItems: "center",
      padding: "1em",
    },
    form: {
      width: "100%",
      padding: "1em",
    },
    textField: {
      width: "100%",
      marginTop: "1em",
      marginBottom: "1em",
    },
    button: {
      width: "100%",
      marginTop: "1em",
    },
  } as const;

  const handleSubmit = () => {
    console.log("submitted!");
  };

  return (
    <Box sx={styles.container}>
      <Typography variant="h5">Edit Your Recipe</Typography>
      <form onSubmit={handleSubmit} style={styles.form}>
        <FormGroup>
          {/* needed ? */}
          <TextField
            id="outlined-basic"
            label="Name *"
            variant="outlined"
            style={styles.textField}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Description *"
            multiline
            minRows={6}
            variant="outlined"
            style={styles.textField}
            onChange={(e) => console.log(e.target.value)}
          />
          {/* <AddLogoImageItem /> */}
          <ImagesUploadingTest />
          <Button type="submit" style={styles.button} variant="contained">
            submit
          </Button>
        </FormGroup>
      </form>
    </Box>
  );
}
