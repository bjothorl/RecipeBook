import { createTheme, ThemeProvider } from "@mui/material";
import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./nav/NavMenu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f4a396",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
});

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
        }}
      >
        <ThemeProvider theme={theme}>
          <NavMenu />
          {this.props.children}
        </ThemeProvider>
      </div>
    );
  }
}
