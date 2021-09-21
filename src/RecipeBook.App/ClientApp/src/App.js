import React, { Component } from "react";
import { Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import "./custom.css";

// fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//components
import WelcomePage from "./pages/WelcomePage";
import RecipesPage from "./pages/RecipesPage";
import ViewRecipe from "./pages/ViewRecipe";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={WelcomePage} />
        <Route exact path="/recipes" component={RecipesPage} />
        <Route exact path="/recipes/view" component={ViewRecipe} />
      </Layout>
    );
  }
}
