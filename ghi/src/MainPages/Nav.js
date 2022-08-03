import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import "./pages.css";
import AuthContext from "../context/AuthContext";

export default function Nav() {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-link" to="/">
          <img src="./packed_p.png" alt="p" className="packed-logo" />
          packed
        </NavLink>
        {!user ? (
          <NavLink className="navbar-brand nav-link" to="/signup">
            signup
          </NavLink>
        ) : null}
        {user ? (
          <NavLink className="navbar-brand nav-link" to="/packinglists">
            my packing lists
          </NavLink>
        ) : null}
        {user ? (
          <div className="navbar-brand nav-link" onClick={logoutUser}>
            logout
          </div>
        ) : (
          <NavLink className="navbar-brand nav-link" to="/login">
            login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
