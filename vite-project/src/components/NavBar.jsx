import { Link } from "react-router-dom";

function NavBar() {
  return (
    <header className="navbar">
      <div className="nav-brand">
        <Link
          to="/"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          CPS731 Project
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/admin" className="nav-link nav-link-primary">
          Admin
        </Link>
        <Link to="/user" className="nav-link">
          User
        </Link>
      </nav>
    </header>
  );
}

export default NavBar;
