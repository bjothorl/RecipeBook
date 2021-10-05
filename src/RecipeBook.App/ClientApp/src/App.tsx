import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import "./custom.css";
import Layout from "./components/Layout";
import fakeData from "./assets/fakeData.json";
import { Recipe } from "./Types";
import { getRecipes } from "./utility/api";

// fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//components
import WelcomePage from "./pages/WelcomePage";
import RecipesPage from "./pages/RecipesPage";
import ViewRecipe from "./pages/ViewRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import AddRecipePage from "./pages/AddRecipePage";
import axios from "axios";

interface Props {}

interface State {
  recipes: Recipe[];
}

export default class App extends Component<Props, State> {
  static displayName = App.name;

  state = {
    recipes: [],
  };

  componentDidMount() {
    getRecipes((res: any) => {
      console.log(res);
      this.setState({ recipes: res });
    });
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route exact path="/" component={() => <WelcomePage />} />
          <Route
            path="/recipes"
            component={() => <RecipesPage recipes={this.state.recipes} />}
          />
          <Route
            path="/view/:id"
            component={() => <ViewRecipe recipes={this.state.recipes} />}
          />
          <Route
            path="/edit/:id"
            component={() => <EditRecipePage recipes={this.state.recipes} />}
          />
          <Route path="/add" component={() => <AddRecipePage />} />
        </Switch>
      </Layout>
    );
  }
}
