import React, { Component } from "react";
import { Container } from "reactstrap";
import NavMenu from "./NavMenu";

type LayoutProps = {
  children?: React.ReactNode; // This type is suitable for anything that React can render
};

export class Layout extends Component<LayoutProps> {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <Container tag="main">{this.props.children}</Container>
      </div>
    );
  }
}
