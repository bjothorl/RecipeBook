import React, { Component } from "react";
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import "./custom.css";
import Layout from "./components/Layout";
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
import RegisterPage from "./pages/RegisterPage";

interface Props {}

interface State {
  token: string | null;
}

class App extends Component<Props & RouteComponentProps<{}>, State> {
  static displayName = App.name;

  constructor(props: Props & RouteComponentProps<{}>) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    if (!token) {
      this.props.history.push("/");
    } else {
      this.setState({
        token: localStorage.getItem("token"),
      });
    }
  }

  handleLogOut = () => {
    localStorage.removeItem("token");
    this.setState({
      token: null,
    });
  };
  handleLogIn = (token: string) => {
    localStorage.setItem("token", token);
    this.setState({
      token: token,
    });
  };

  render() {
    return (
      <Layout token={this.state.token} onLogOut={this.handleLogOut}>
        <Switch>
          <Route
            exact
            path="/"
            component={() => <WelcomePage onLogIn={this.handleLogIn} />}
          />
          <Route path="/register" component={() => <RegisterPage />} />
          <Route path="/recipes" component={() => <RecipesPage />} />
          <Route path="/view/:id" component={() => <ViewRecipe />} />
          <Route path="/edit/:id" component={() => <EditRecipePage />} />
          <Route path="/add" component={() => <AddRecipePage />} />
        </Switch>
      </Layout>
    );
  }
}

export default withRouter(App);
