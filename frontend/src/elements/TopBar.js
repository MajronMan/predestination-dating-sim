import React from "react";
import { NavLink } from "react-router-dom";

import UserPanel from "./UserPanel";

import "./TopBar.scss";

const TopBar = () => (
  <header className="TopBar">
    <nav className="TopBarLinks">
      <NavLink exact to="/" className="TopBarLink Link">
        Home
      </NavLink>
      <NavLink exact to="/register" className="TopBarLink Link">
        Register
      </NavLink>
      <NavLink exact to="/game" className="TopBarLink Link">
        Play
      </NavLink>
    </nav>
    <UserPanel />
  </header>
);

export default TopBar;
