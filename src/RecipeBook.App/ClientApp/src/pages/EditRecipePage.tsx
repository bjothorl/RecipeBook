import React, { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, FormGroup, TextField, Typography, Box } from "@mui/material";
import ImageUploader from "../components/RecipeForm/ImageUploader";
import RecipeFormList from "../components/RecipeForm/RecipeFormList";
import { Recipe } from "../Types";
import { v4 } from "uuid";

interface Props {
  recipes: Recipe[];
}

const createUniqueKeys = (recipe?: Recipe) => {
  if (recipe) {
    let n = Math.max(recipe.instructions.length, recipe.ingredients.length);
    let arr: string[] = [];
    for (let i = 0; i < n; i++) {
      arr.push(v4());
    }
    return arr;
  }
  return [""];
};

export default function EditRecipePage({ recipes }: Props): ReactElement {
  let { id } = useParams<{ id: string }>();
  const rec = recipes.find((r: Recipe) => r.id === id);
  const [recipe, setRecipe] = useState<Recipe | undefined>(rec);
  const [keys, setKeys] = useState<string[]>(createUniqueKeys(rec));
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
    title: {
      marginTop: "1em",
      alignSelf: "center",
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

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = URL.createObjectURL(e.target.files[0]);
      setRecipe({
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

    setKeys(createUniqueKeys(recipe));

    if (ingredients) {
      setRecipe({
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

    setKeys(createUniqueKeys(recipe));

    if (instructions) {
      setRecipe({
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
      const tmp = {
        ...recipe,
        ingredients: ingredients,
      };
      setKeys(createUniqueKeys(tmp));
      setRecipe(tmp as Recipe);
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
      const tmp = {
        ...recipe,
        instructions: instructions,
      };
      setKeys(createUniqueKeys(tmp));
      setRecipe(tmp as Recipe);
    }
  };

  const handleTextChange = (textField: any) => {
    if (textField !== undefined && textField !== null && recipe) {
      const arr = textField.target.name.split("_");
      const val = textField.target.value;
      console.log(arr, val);

      let tmp = { ...recipe };

      if (tmp && tmp.ingredients && tmp.instructions) {
        if (arr[0] === "title") {
          tmp.title = val;
        } else if (arr[0] === "description") {
          tmp.description = val;
        } else if (arr[0] === "ingredient") {
          if (tmp.ingredients[arr[1]] !== undefined) {
            if (arr[2] === "quantity") tmp.ingredients[arr[1]].quantity = val;
            if (arr[2] === "unit") tmp.ingredients[arr[1]].unit = val;
            if (arr[2] === "ingredient")
              tmp.ingredients[arr[1]].ingredient = val;
          }
        } else if (arr[0] === "instruction") {
          if (tmp.instructions[arr[1]] !== undefined) {
            tmp.instructions[1].instruction = val;
          }
        }
        console.log(tmp);
        setRecipe(tmp);
      }
    }
  };

  const fixOrdinalPositions = (items: any) => {
    const tmp = [...items];
    tmp.forEach((item, i) => (item.ordinalPosition = i + 1));
    return items;
  };

  return (
    <Box sx={styles.container}>
      {recipe && (
        <Box sx={styles.recipeContainer}>
          <Typography variant="h5" sx={styles.title}>
            Edit {recipe.title}
          </Typography>
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
                keys={keys}
              />

              <Box sx={styles.buttons}>
                <Button
                  style={styles.button}
                  variant="contained"
                  color="secondary"
                >
                  delete
                </Button>
                <Button
                  style={styles.button}
                  variant="contained"
                  color="secondary"
                >
                  preview?
                </Button>
                <Button type="submit" style={styles.button} variant="contained">
                  save
                </Button>
              </Box>
            </FormGroup>
          </form>
        </Box>
      )}
    </Box>
  );
}
