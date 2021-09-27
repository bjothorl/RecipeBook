import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, FormGroup, TextField, Typography, Box } from "@mui/material";

import ImageUploader from "../components/RecipeForm/ImageUploader";
import RecipeFormList from "../components/RecipeForm/RecipeFormList";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(recipe, "submitted!");
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = URL.createObjectURL(e.target.files[0]);
      console.log(file);
      setRecipe({
        ...recipe,
        logo: file,
      } as Recipe);
    }

    // if this doesnt work, use dropzone
    // https://www.npmjs.com/package/react-dropzone
    // https://github.com/bjothorl/opvind-edc-gade-cms/blob/master/client/src/components/DropZone.js
  };

  return (
    <Box sx={styles.container}>
      {recipe && (
        <>
          <Typography variant="h5">Edit {recipe.title}</Typography>
          <form onSubmit={handleSubmit} style={styles.form}>
            <FormGroup>
              {/* needed ? */}
              <TextField
                id="outlined-basic"
                defaultValue={recipe?.title}
                label="Name *"
                variant="outlined"
                style={styles.textField}
                onChange={(e) => console.log(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Description *"
                defaultValue={recipe?.description}
                multiline
                minRows={6}
                variant="outlined"
                style={styles.textField}
                onChange={(e) => console.log(e.target.value)}
              />
              <ImageUploader
                onChange={handleImageUpload}
                image={recipe ? recipe.logo : undefined}
              />

              <RecipeFormList recipe={recipe} />

              <Button type="submit" style={styles.button} variant="contained">
                submit
              </Button>
            </FormGroup>
          </form>
        </>
      )}
    </Box>
  );
}
