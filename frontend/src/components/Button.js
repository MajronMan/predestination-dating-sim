import React from "react";
import { mkClassName } from "../utils/JSX";

import "./Button.scss";

const Button = ({ secondary, className, children, ...props }) => (
  <button
    className={mkClassName(
      "Button",
      secondary ? "ButtonSecondary" : "ButtonPrimary",
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
