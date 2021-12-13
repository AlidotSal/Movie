import React from "react";
import { Link } from "react-router-dom";
import Theme from "./Theme";
import "./nav.css";

export default ({ theme, setTheme }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={"/news"}>news</Link>
        </li>
        <li>
          <Link to={"/about"}>About us</Link>
        </li>
        <li>
          <Theme theme={theme} setTheme={setTheme} />
        </li>
      </ul>
    </nav>
  );
};
