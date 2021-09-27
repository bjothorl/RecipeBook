import React, { ReactElement } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  image?: string;
}

export default function ImageUploader({
  onChange,
  image,
}: Props): ReactElement {
  const styles = {
    container: {
      flex: 1,
    },
    input: {
      position: "absolute",
      width: "100%",
      maxWidth: "1000px",
      height: "250px",
      marginTop: "-250px",
      opacity: 0,
      flex: 1,
      cursor: "pointer",
    },
    imageInput: {
      width: "100%",
      height: "250px",
      border: "2px dotted #ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    image: {
      height: "80%",
      objectFit: "contain",
    },
  } as const;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imageInput}>
        <Typography>Drag 'n Drop your Image Here:</Typography>
        <img src={image} style={styles.image} />
      </Box>
      <input
        style={styles.input}
        type="file"
        // multiple
        onChange={onChange}
        accept="image/*"
      />
    </Box>
  );
}
