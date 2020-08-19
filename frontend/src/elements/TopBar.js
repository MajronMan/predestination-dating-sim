import React from "react";
import { NavLink } from "react-router-dom";

import UserPanel from "./UserPanel";

import "./TopBar.scss";

const TopBar = () => (
  <header className="TopBar">
    <nav className="TopBarLinks">
      <NavLink to="/" className="Link">
        Home
      </NavLink>
      <NavLink to="/login" className="Link">
        Login
      </NavLink>
      <NavLink to="/game" className="Link">
        Play
      </NavLink>
    </nav>
    <UserPanel />
  </header>
);

export default TopBar;
