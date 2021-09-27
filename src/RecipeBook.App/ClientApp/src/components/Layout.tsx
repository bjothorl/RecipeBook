import { createTheme, ThemeProvider } from "@mui/material";
import React, { Component } from "react";
import NavMenu from "./nav/NavMenu";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f4a396",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#aaa",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
});

interface Props {}
interface State {}

export default class Layout extends Component<Props, State> {
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
