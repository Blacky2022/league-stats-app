/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { LogoutButton } from "../buttons/LogoutButton";
import { ForbiddenProvider } from "../ForbiddenContext";
export const Navbar = () => {
  const colorOfLink = ({ isActive }) => ({
    color: isActive ? "orange" : "black",
  });

  return (
    <header>
      <div className="nav-links">
        <div className="logo">IntegracjaSystemów</div>
        <NavLink style={colorOfLink} to="/performance">
          ChampionPerformance
        </NavLink>
        <ForbiddenProvider>
          <NavLink style={colorOfLink} to="/UpdatePatchNotes">
            UpdatePatchNotes
          </NavLink>
        </ForbiddenProvider>

        <NavLink style={colorOfLink} to="/WorldsPerformance">
          WorldsPerformance
        </NavLink>
        <NavLink style={colorOfLink} to="/Data">
          Import Data
        </NavLink>
        <LogoutButton />
      </div>
      <hr />
    </header>
  );
};
