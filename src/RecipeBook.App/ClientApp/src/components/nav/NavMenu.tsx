import React, { Component } from "react";
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "./NavMenu.css";

interface Props {
  token: String | null;
  onLogOut: () => void;
}
interface State {
  collapsed: boolean;
}

export default class NavMenu extends Component<Props, State> {
  static displayName = NavMenu.name;

  constructor(props: Props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
    };
  }
  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm primary-background"
          light
        >
          <Container>
            <NavbarBrand tag={Link} to="/">
              <MenuBookIcon sx={{ fontSize: 50, color: "white" }} />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                {this.props.token && (
                  <NavItem>
                    <NavLink
                      tag={Link}
                      className="text-light"
                      to="/"
                      onClick={this.props.onLogOut}
                    >
                      <Typography variant="h6" gutterBottom component="div">
                        LOG OUT
                      </Typography>
                    </NavLink>
                  </NavItem>
                )}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
