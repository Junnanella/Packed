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
      </div>
    </nav>
  );
}
