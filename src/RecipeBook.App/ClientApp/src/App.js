import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "./components/Layout";
import fakeData from "./assets/fakeData.json";
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

  state = {
    recipes: [],
  };

  componentDidMount() {
    this.setState({ recipes: fakeData });
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={WelcomePage} />
          <Route
            path="/recipes"
            component={(props) => (
              <RecipesPage props={props} recipes={this.state.recipes} />
            )}
          />
          <Route path="/view/:id" component={ViewRecipe} />
        </Switch>
      </Layout>
    );
  }
}
