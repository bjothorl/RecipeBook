import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Typography } from "@mui/material";
import { FormGroup } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface Props {}

export default function WelcomePage(props: Props): ReactElement {
  const [email, setEmail] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  let history = useHistory();

  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "row",
    },
    button: {
      width: "100%",
      marginTop: "1em",
    },
    form: {
      width: "100%",
      padding: "1em",
    },
    icon: {
      display: "flex",
      background: "darkgrey",
      width: "2em",
      height: "2em",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "1em",
      color: "white",
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
      width: "100%",
      marginTop: "1em",
      marginBottom: "1em",
    },
  } as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    history.push("/recipes");
  };

  return (
    <Box sx={styles.container}>
      <img style={styles.img} src={require("../assets/food.jpg").default} />
      <Box sx={styles.login}>
        <Box sx={styles.icon}>
          <LockOpenIcon />
        </Box>
        <Typography>Sign In</Typography>
        <form onSubmit={handleSubmit} style={styles.form}>
          <FormGroup>
            <TextField
              key={0}
              id="outlined-basic"
              label="email"
              variant="outlined"
              style={styles.textField}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              key={1}
              id="outlined-basic"
              label="password"
              variant="outlined"
              style={styles.textField}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button type="submit" style={styles.button} variant="contained">
              sign in
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
}
