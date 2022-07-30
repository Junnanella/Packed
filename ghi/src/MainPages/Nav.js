import { NavLink } from "react-router-dom";
import "./pages.css";

export default function Nav() {
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
        <NavLink className="navbar-brand nav-link" to="/login">
          Login
        </NavLink>
        <NavLink className="navbar-brand nav-link" to="/test-component">
          Test
        </NavLink>
      </div>
    </nav>
  );
}
