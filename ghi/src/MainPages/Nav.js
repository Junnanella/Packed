import { NavLink } from "react-router-dom";
import React, {useContext} from 'react'
import "./pages.css";
import AuthContext from "../context/AuthContext";

export default function Nav() {
  let {user, logoutUser} = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-link" to="/">
          <img src="./packed_p.png" alt="p" className="packed-logo" />
          packed
        </NavLink>
        <NavLink className="navbar-brand nav-link" to="/signup">
          Signup
        </NavLink>
        {user ? <p className="navbar-brand nav-link" onClick={logoutUser}>Logout</p> 
          :
          <NavLink className="navbar-brand nav-link" to="/login">
            Login
          </NavLink>
        }
        <NavLink className="navbar-brand nav-link" to="/test-component">
          Test
        </NavLink>
      </div>
    </nav>
  );
}
