import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Button from "@mui/material/Button";

interface Props {
  itemSize: { width: number; height: number };
  img?: string;
  title?: string;
  content?: string;
  onViewClick?: React.MouseEventHandler<HTMLButtonElement>;
  onEditClick?: React.MouseEventHandler<HTMLButtonElement>;
  onAddClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function RecipeListItem({
  itemSize,
  img,
  title,
  content,
  onViewClick,
  onEditClick,
  onAddClick,
}: Props) {
  const styles = {
    img: {
      background: "lightgrey",
      width: "100%",
      height: "45%",
      minHeight: "45%",
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
    },
  } as const;

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
              <Typography variant="body1">{content}</Typography>
            </Box>
            <Box sx={styles.buttonContainer}>
              <Button sx={{ marginRight: "1em" }} onClick={onViewClick}>
                view
              </Button>
              <Button onClick={onEditClick}>edit</Button>
            </Box>
          </>
        ) : (
          <Box sx={styles.iconContainer}>
            <Button onClick={onAddClick} sx={styles.addRecipeButtonContainer}>
              <ControlPointIcon sx={{ fontSize: 50 }} />
              <Typography variant="h6">Add recipe</Typography>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
