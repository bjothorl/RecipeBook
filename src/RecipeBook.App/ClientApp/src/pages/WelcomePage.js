import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function WelcomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = {
    box: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
    },
    button: {
      width: "100%",
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
      padding: "1em",
    },
    textField: {
      width: "100%",
      marginBottom: "1em",
    },
  };

  return (
    <Box sx={styles.box}>
      <img style={styles.img} src={require("../assets/food.jpg").default} />
      <Box sx={styles.login}>
        <TextField
          id="outlined-basic"
          label="email"
          variant="outlined"
          style={styles.textField}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="password"
          variant="outlined"
          style={styles.textField}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button style={styles.button} variant="contained">
          sign in
        </Button>
      </Box>
    </Box>
  );
}
