import React from "react";
import Nav from "./Component/nav";
import SiteHead from "./Component/header";
import Navhead from "./Component/nav/navhead";
import Header from "./Component/header/Header.js";

import "../src/css.css";

export default class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {navMini: false}
  }

  toggleNav = (e) => {
      e.preventDefault();
      this.setState({navMini: !this.state.navMini});
  }
  hideNav = (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.setState({navMini: false})
  }
  render() {
    let navMini = this.state.navMini;
    return (
      <React.Fragment>
        <SiteHead toggleNav={this.toggleNav} />
        <div className="app-wrapper">
          <Nav mini={navMini} toggleNav={this.toggleNav} />
          <div className={`content-container ${navMini ? "full" : ""}`}>
            {/* dropshadow for mobile nav triggering */}
            <div
              className="menu-dropshadow"
              style={{ display: navMini ? "block" : "none" }}
              onClick={this.hideNav}
            ></div>
            <div
              className="menu-dropshadow"
              style={{ display: navMini ? "block" : "none" }}
              onClick={this.hideNav}
            ></div>
            {this.props.children}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
