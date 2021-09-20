import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import "./custom.css";
import WelcomePage from "./pages/WelcomePage";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={WelcomePage} />
      </Layout>
    );
  }
}
