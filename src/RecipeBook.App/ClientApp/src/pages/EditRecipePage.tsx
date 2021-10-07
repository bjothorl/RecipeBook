import React, { FormEvent, ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, formControlClasses, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Recipe } from "../Types";
import RecipeForm from "../components/RecipeForm/RecipeForm";
import { getRecipe, editRecipe, deleteRecipe } from "../utility/Api/recipe";

export default function EditRecipePage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  let history = useHistory();

  useEffect(() => {
    getRecipe(id, (res: Recipe) => {
      setRecipe(res);
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
    title: {
      marginTop: "1em",
      alignSelf: "center",
    },
  } as const;

  const handleSubmit = (event: FormEvent, blob?: string) => {
    event.preventDefault();
    setLoading(true);

    let data = { ...recipe } as Recipe;

    if (blob !== undefined) {
      data = {
        ...recipe,
        logo: blob,
      } as Recipe;
    }

    editRecipe(data, (res: any) => {
      console.log(res);
      history.push("/view/" + recipe?.id);
    });
  };

  const handleDelete = () => {
    if (recipe)
      deleteRecipe(recipe?.id, (res: any) => {
        console.log(res);
        history.push("/recipes");
      });
  };

  if (recipe)
    return (
      <Box sx={styles.container}>
        <Box sx={styles.recipeContainer}>
          <Typography variant="h5" sx={styles.title}>
            Edit {recipe.title}
          </Typography>
          <RecipeForm
            recipe={recipe}
            onUpdateRecipe={setRecipe}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            type={"edit"}
          />
        </Box>
      </Box>
    );
  else return <>no recipe</>;
}
