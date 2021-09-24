import React, { ReactElement, useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Typography } from "@mui/material";

interface Props {}

export default function AddLogoImageItem({}: Props): ReactElement {
  const [images, setImages] = useState([]);
  const styles = {
    imageInput: {
      width: "100%",
      height: "200px",
      border: "2px dotted #ccc",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  } as const;

  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList as never[]);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={() => console}
      maxNumber={1}
    >
      <div style={styles.imageInput}>
        <Typography>drop image here</Typography>
      </div>
    </ImageUploading>
  );
}
