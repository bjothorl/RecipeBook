import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import requirePropFactory from "@mui/utils/requirePropFactory";
import TextField from "@mui/material/TextField";

export default function WelcomePage() {
  const styles = {
    box: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
    },
    img: {
      width: "60%",
      objectFit: "cover",
    },
    login: {
      display: "flex",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    textField: {
      width: "50%",
    },
  };

  return (
    <Box sx={styles.box}>
      <img style={styles.img} src={require("../assets/food.jpg").default} />
      <Box sx={styles.login}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          style={styles.textField}
        />
        <TextField
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          style={styles.textField}
        />
      </Box>
    </Box>
  );
}
