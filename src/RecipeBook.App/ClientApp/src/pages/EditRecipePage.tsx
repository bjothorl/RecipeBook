import React, { FormEvent, ReactElement, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, formControlClasses, Typography } from "@mui/material";
import { useHistory } from "react-router-dom";
import { Recipe } from "../Types";
import RecipeForm from "../components/RecipeForm/RecipeForm";
import { getRecipe, editRecipe, deleteRecipe } from "../utility/Api/recipe";
import { AxiosResponse } from "axios";
import RecipeFormDialog from "../components/RecipeForm/RecipeFormDialog";

export default function EditRecipePage(): ReactElement {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  let history = useHistory();

  useEffect(() => {
    getRecipe(id, (res: AxiosResponse<any>) => {
      if (res && res.status == 200) {
        setRecipe(res.data as Recipe);
      } else {
        history.push("/");
      }
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

    editRecipe(data, (res: AxiosResponse<any>) => {
      if (res && res.status == 200) {
        history.push("/view/" + recipe?.id);
      } else {
        setLoading(false);
        setError(res.data.message);
      }
    });
  };

  const handleDelete = () => {
    setLoading(true);
    if (recipe)
      deleteRecipe(recipe?.id, (res: AxiosResponse<any>) => {
        if (res && res.status == 200) {
          history.push("/recipes");
        } else {
          setLoading(false);
          setError(res.data.message);
        }
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
            error={error}
          />
        </Box>
        <RecipeFormDialog title={"Loading..."} open={loading} />
      </Box>
    );
  else return <>no recipe</>;
}
