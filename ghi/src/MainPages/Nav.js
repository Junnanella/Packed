import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <NavLink className="navbar-brand nav-link" to="/">
          packed
        </NavLink>
      </div>
    </nav>
  );
}
