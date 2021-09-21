import React, { useRef, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";
export default function AppListItem({
  itemSize,
  img,
  title,
  content,
  onClick,
}) {
  const addRecipeButtonContainer = useRef({ current: { clientWidth: 50 } }); //{ current: { clientWidth: 50 } }
  const [addRecipeButtonWidth, setAddRecipeButtonWidth] = useState(50);

  useEffect(() => {
    if (addRecipeButtonContainer)
      setAddRecipeButtonWidth(addRecipeButtonContainer.current.clientWidth);
  }, [addRecipeButtonContainer]);

  const styles = {
    img: {
      background: "lightgrey",
      width: "100%",
      height: "45%",
      objectFit: "cover",
    },
    recipeContainer: {
      width: itemSize.width,
      height: itemSize.height,
      padding: "1em",
    },
    recipeBox: {
      display: "flex",
      width: "100%",
      height: "100%",
      flexDirection: "column",
      borderWidth: "1px",
      boxShadow: "0px 2px 2px #555555",
      padding: "1em",
    },
    iconContainer: {
      display: "flex",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      margin: "0.5em 0",
      textAlign: "left",
    },
    content: {
      flexGrow: 1,
      textAlign: "left",
      overflow: "hidden",
    },
    buttonContainer: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "flex-end",
      margin: "0.5em 0 0 0",
    },
    addRecipeButtonContainer: {
      flexDirection: "column",
      width: "75%",
      height: addRecipeButtonWidth + "px",
      borderRadius: "100%",
      // boxShadow: "2px 2px 2px 2px #555555",
    },
  };

  return (
    <Box sx={styles.recipeContainer}>
      <Box sx={styles.recipeBox} color="secondary">
        {img ? (
          <>
            <img src={img} style={styles.img} />
            <Typography variant="h6" sx={styles.title}>
              {title}
            </Typography>
            <Box sx={styles.content}>
              <Typography variant="h7">{content}</Typography>
            </Box>
            <Box sx={styles.buttonContainer}>
              <Button sx={{ marginRight: "1em" }} onClick={onClick}>
                view
              </Button>
              <Button>edit</Button>
            </Box>
          </>
        ) : (
          <Box sx={styles.iconContainer}>
            <Button
              onClick={onClick}
              ref={addRecipeButtonContainer}
              sx={styles.addRecipeButtonContainer}
            >
              <ControlPointIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6">Add recipe</Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
