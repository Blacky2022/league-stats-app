import React from "react";
import { Link } from "react-router-dom";
import "./navCSS.css";

export const NavBar= () => {
  return (
    <body>
      <header>
        <img className="logo" src="images/logo.svg" alt="projekt" />
        <nav>
          <ul className="nav_links">
            <li>
              <Link to="/">LoginPage</Link>
            </li>
            <li>
              <Link to="/ChampionStats">ChampionStats</Link>
            </li>
            <li>
              <Link to="/UpdatePerformance">UpdatePerformance</Link>
            </li>
            <li>
              <Link to="/WorldsPerformance">WorldsPerformance</Link>
            </li>
          </ul>
        </nav>
        <button className="cta">
          <Link to="#">Contact</Link>
        </button>
      </header>
    </body>
  );
};


