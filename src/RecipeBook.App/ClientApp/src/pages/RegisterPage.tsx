import React, { FormEvent, ReactElement, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { FormGroup } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { registerUser } from "../utility/Api/user";
import { ClassNames } from "@emotion/react";
import { Axios, AxiosError, AxiosResponse } from "axios";
import { useHistory } from "react-router-dom";

interface Props {}

export default function RegisterPage({}: Props): ReactElement {
  const [email, setEmail] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [error, setError] = useState<String>("");
  let history = useHistory();

  const [emailSent, setEmailSent] = useState<Boolean>(false);
  const [verificationCode, setVerificationCode] = useState<String>("");

  const styles = {
    container: {
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    register: {
      width: "50%",
      maxWidth: "450px",
      minWidth: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
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
    button: {
      width: "100%",
      marginTop: "1em",
    },
    form: {
      width: "100%",
      padding: "1em",
    },
    textField: {
      width: "100%",
      marginTop: "1em",
      marginBottom: "1em",
    },
    title: {
      textAlign: "center",
    },
  } as const;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    registerUser(
      { Username: username, Password: password },
      (res: AxiosResponse<any>) => {
        if (res && res.status == 200) history.push("/");
        else {
          console.log(res);
          setError("All fields are required.");
        }
      }
    );
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.register}>
        <Box sx={styles.icon}>
          <LockOpenIcon />
        </Box>
        <Typography variant="h6">Register</Typography>
        {error !== "" && (
          <Typography variant="h6" color="red">
            {error}
          </Typography>
        )}
        <form onSubmit={handleSubmit} style={styles.form}>
          <FormGroup>
            <TextField
              key={1}
              id="outlined-basic"
              label="username"
              variant="outlined"
              style={styles.textField}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              key={2}
              id="outlined-basic"
              label="password"
              variant="outlined"
              style={styles.textField}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" style={styles.button} variant="contained">
              register
            </Button>
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
}
