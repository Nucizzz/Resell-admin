import React from "react";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="nav">
      <div className="navin">
        <div className="brand">Resell Admin</div>
        <NavLink
          className={({ isActive }) => "link " + (isActive ? "active" : "")}
          to="/"
        >
          Dashboard
        </NavLink>
        <NavLink
          className={({ isActive }) => "link " + (isActive ? "active" : "")}
          to="/scan"
        >
          Scansione
        </NavLink>
        <NavLink
          className={({ isActive }) => "link " + (isActive ? "active" : "")}
          to="/ops"
        >
          Operazioni
        </NavLink>
        <NavLink
          className={({ isActive }) => "link " + (isActive ? "active" : "")}
          to="/new"
        >
          Nuovo Prodotto
        </NavLink>
        <NavLink
          className={({ isActive }) => "link " + (isActive ? "active" : "")}
          to="/settings"
        >
          Impostazioni
        </NavLink>
        <div className="spacer"></div>
      </div>
    </div>
  );
}
