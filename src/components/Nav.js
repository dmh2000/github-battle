import React from "react";
import { NavLink } from "react-router-dom";
import ThemeContext from "../context/theme";

const activeStyle = {
  color: "red",
};
export default function Nav() {
  return (
    <ThemeContext.Consumer>
      {/* children render prop*/}
      {({ theme, toggleTheme }) => (
        <nav className="row space-between">
          <ul className="row nav">
            <li>
              <NavLink
                exact
                to="/"
                className="nav-link"
                activeStyle={activeStyle}
              >
                Popular
              </NavLink>
            </li>
            <li>
              <NavLink
                exact
                to="/battle"
                className="nav-link"
                activeStyle={activeStyle}
              >
                Battle
              </NavLink>
            </li>
          </ul>

          <button
            style={{ fontSize: 30 }}
            className="btn-clear"
            onClick={toggleTheme}
          >
            {theme === "light" ? "🔦" : "💡"}
          </button>
        </nav>
      )}
    </ThemeContext.Consumer>
  );
}
