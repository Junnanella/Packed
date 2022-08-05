import { NavLink } from "react-router-dom";
import React, { useContext } from "react";
import "./pages.css";
import AuthContext from "../context/AuthContext";
import packedLogo from "../Images/packed_p.png";

export default function Nav() {
  // to access whether a user is logged in or not
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <nav className="navbar">
      <div className="d-flex justify-content-start">
        <NavLink className="navbar-brand nav-link" to="/" data-testid="logo">
          <img src={packedLogo} alt="packed" className="packed-logo" />
          packed
        </NavLink>
        {user ? (
          <NavLink className="nav-link " to="/packinglists">
            my packing lists
          </NavLink>
        ) : null}
      </div>
      <div className="d-flex justify-content-end">
        {!user ? (
          <NavLink className="nav-link" to="/signup">
            signup
          </NavLink>
        ) : null}
        {user ? (
          <div className="nav-link me-5" onClick={logoutUser}>
            logout
          </div>
        ) : (
          <NavLink className="nav-link me-5" to="/login">
            login
          </NavLink>
        )}
      </div>
    </nav>
  );
}
