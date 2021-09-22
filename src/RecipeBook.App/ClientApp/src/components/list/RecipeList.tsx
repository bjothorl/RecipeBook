import React, { ReactElement, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Box } from "@mui/system";
import { v4 } from "uuid";

import AppListItem from "./AppListItem";
import { Recipe } from "../../Types";

interface Props {
  data: Recipe[];
  itemSize: { width: number; height: number };
}

export default function RecipeList({ data, itemSize }: Props): ReactElement {
  // calculate width of elements in row
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  let history = useHistory();

  const updateDimensions = () => {
    setWindowWidth(window.innerWidth - 50); //50 padding
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const containerWidth = () => {
    //makes sure that grid is centered
    if (!data || itemSize.width * (data.length + 1) < windowWidth)
      return "auto";
    const width = Math.floor(windowWidth / itemSize.width) * itemSize.width;
    return width > 0 ? width : "auto";
  };

  const styles = {
    recipesContainer: {
      display: "flex",
      flexDirection: "row",
      width: containerWidth(),
      height: "auto",
      justifyContent: "flex-start",
      flexWrap: "wrap",
    },
  } as const;

  const handleOnClick = (recipe: Recipe) => {
    history.push("/view/" + recipe.id);
  };
  const handleOnAddRecipe = () => {
    console.log("add recipe!");
  };

  return (
    <Box sx={styles.recipesContainer}>
      {data &&
        data.map((recipe) => (
          <AppListItem
            onClick={() => handleOnClick(recipe)}
            key={v4()}
            itemSize={itemSize}
            img={recipe.logo}
            title={recipe.title}
            content={recipe.description}
          />
        ))}
      <AppListItem itemSize={itemSize} onClick={handleOnAddRecipe} />
    </Box>
  );
}
