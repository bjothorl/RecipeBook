import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, FormGroup, TextField, Typography, Box } from "@mui/material";
import { v4 } from "uuid";

import { Recipe } from "../../Types";
import ImageUploader from "./ImageUploader";
import RecipeFormList from "./RecipeFormList";
import RecipeFormDialog from "./RecipeFormDialog";

interface Props {
  recipe?: Recipe;
  onUpdateRecipe: (recipe: Recipe) => void;
}

const createUniqueKeys = (n?: number) => {
  if (n) {
    let arr: string[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(v4());
    }
    return arr;
  }
  return [""];
};
const fixOrdinalPositions = (items: any) => {
  const tmp = [...items];
  tmp.forEach((item, i) => (item.ordinalPosition = i + 1));
  return items;
};

export default function RecipeForm({
  recipe,
  onUpdateRecipe,
}: Props): ReactElement {
  const history = useHistory();
  const [ingredientKeys, setIngredientKeys] = useState<string[]>(
    createUniqueKeys(recipe?.ingredients.length)
  );
  const [instructionKeys, setInstructionKeys] = useState<string[]>(
    createUniqueKeys(recipe?.instructions.length)
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const styles = {
    form: {
      width: "100%",
      padding: "1em",
    },
    textField: {
      width: "100%",
      marginTop: "1em",
      marginBottom: "1em",
    },
    buttons: {
      width: "30%",
      marginTop: "2em",
      alignSelf: "flex-end",
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      flex: 1,
      margin: "0.5em",
    },
  } as const;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // update recipe in database
    console.log(recipe, "submitted!");

    // handle serverside errors (null quantity etc.)
  };

  const handleCloseDialog = (e: any) => {
    setDialogOpen(false);
  };

  const handleDelete = (e: any) => {
    console.log(recipe?.id, "deleted!");
    history.push("/recipes");
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = URL.createObjectURL(e.target.files[0]);
      onUpdateRecipe({
        ...recipe,
        logo: file,
      } as Recipe);
    }

    // if this doesnt work, use dropzone
    // https://www.npmjs.com/package/react-dropzone
    // https://github.com/bjothorl/opvind-edc-gade-cms/blob/master/client/src/components/DropZone.js
  };

  const handleRemoveIngredient = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ordinalPosition: number
  ) => {
    e.preventDefault();

    const ingredients = recipe?.ingredients.filter(
      (i) => i.ordinalPosition !== ordinalPosition
    );

    setIngredientKeys(createUniqueKeys(recipe?.ingredients.length));

    if (ingredients) {
      onUpdateRecipe({
        ...recipe,
        ingredients: fixOrdinalPositions(ingredients),
      } as Recipe);
    }
  };

  const handleRemoveInstruction = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ordinalPosition: number
  ) => {
    e.preventDefault();
    const instructions = recipe?.instructions.filter(
      (i) => i.ordinalPosition !== ordinalPosition
    );

    setInstructionKeys(createUniqueKeys(recipe?.instructions.length));

    if (instructions) {
      onUpdateRecipe({
        ...recipe,
        instructions: fixOrdinalPositions(instructions),
      } as Recipe);
    }
  };

  const handleAddIngredient = () => {
    if (recipe !== undefined) {
      const ingredients = [...recipe.ingredients];
      ingredients.push({
        recipeId: recipe.id,
        ingredient: "",
        unit: "",
        quantity: null,
        ordinalPosition: recipe.ingredients.length + 1,
      });
      const tmp: Recipe = {
        ...recipe,
        ingredients: ingredients,
      };
      setIngredientKeys(createUniqueKeys(tmp?.ingredients.length));
      onUpdateRecipe(tmp);
    }
  };

  const handleAddInstruction = () => {
    if (recipe !== undefined) {
      const instructions = [...recipe.instructions];
      instructions.push({
        recipeId: recipe.id,
        instruction: "",
        ordinalPosition: recipe.instructions.length + 1,
      });
      const tmp: Recipe = {
        ...recipe,
        instructions: instructions,
      };
      setInstructionKeys(createUniqueKeys(tmp?.instructions.length));
      onUpdateRecipe(tmp);
    }
  };

  const handleTextChange = (
    textField: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (textField !== undefined && textField !== null && recipe) {
      const arr: string[] = textField.target.name.split("_");
      const strIndex: number = parseInt(arr[1]);
      const val: string = textField.target.value;

      let tmp: Recipe = { ...recipe };

      if (tmp && tmp.ingredients && tmp.instructions) {
        if (arr[0] === "title") {
          tmp.title = val;
        } else if (arr[0] === "description") {
          tmp.description = val;
        } else if (arr[0] === "ingredient") {
          if (tmp.ingredients[strIndex] !== undefined) {
            if (arr[2] === "quantity")
              tmp.ingredients[strIndex].quantity = parseInt(val);
            if (arr[2] === "unit") tmp.ingredients[strIndex].unit = val;
            if (arr[2] === "ingredient")
              tmp.ingredients[strIndex].ingredient = val;
          }
        } else if (arr[0] === "instruction") {
          if (tmp.instructions[strIndex] !== undefined) {
            tmp.instructions[strIndex].instruction = val;
          }
        }
        onUpdateRecipe(tmp);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <FormGroup>
        {/* needed ? */}
        <TextField
          id="outlined-basic"
          name="title"
          defaultValue={recipe?.title}
          label="Title *"
          variant="outlined"
          style={styles.textField}
          onChange={handleTextChange}
        />
        <TextField
          id="outlined-basic"
          name="description"
          label="Description *"
          defaultValue={recipe?.description}
          multiline
          minRows={6}
          variant="outlined"
          style={styles.textField}
          onChange={handleTextChange}
        />
        <ImageUploader
          onChange={handleImageUpload}
          image={recipe ? recipe.logo : undefined}
        />

        <RecipeFormList
          recipe={recipe}
          onRemoveIngredient={handleRemoveIngredient}
          onRemoveInstruction={handleRemoveInstruction}
          onAddIngredient={handleAddIngredient}
          onAddInstruction={handleAddInstruction}
          onTextChange={handleTextChange}
          ingredientKeys={ingredientKeys}
          instructionKeys={instructionKeys}
        />

        <Box sx={styles.buttons}>
          <Button
            style={styles.button}
            variant="contained"
            color="secondary"
            onClick={() => setDialogOpen(true)}
          >
            delete
          </Button>
          <Button style={styles.button} variant="contained" color="secondary">
            preview?
          </Button>
          <Button type="submit" style={styles.button} variant="contained">
            save
          </Button>

          <RecipeFormDialog
            title="Do you really want to delete?"
            open={dialogOpen}
            onClose={handleCloseDialog}
            onConfirm={handleDelete}
          />
        </Box>
      </FormGroup>
    </form>
  );
}