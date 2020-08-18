import React from "react";
import { NavLink } from "react-router-dom";

import './TopBar.css'

const TopBar = () => (
  <header className="TopBar">
    <nav className="TopBarLinks">
      <NavLink to="/" className="Link">Home</NavLink>
      <NavLink to="/login" className="Link">Login</NavLink>
      <NavLink to="/game" className="Link">Play</NavLink>
    </nav>
  </header>
)

export default TopBar;