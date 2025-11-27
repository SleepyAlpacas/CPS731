import { Link } from "react-router-dom";
import { useAuth } from "../UserProfileModule";

function NavBar() {
  const auth = useAuth(); // might be null if no provider
  const { loggedIn, username, isAdmin } = auth ?? {
    loggedIn: false,
    username: null,
    isAdmin: false,
  };

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
        {!loggedIn && (
          <>
            <Link to="/login" className="nav-link nav-link-primary">
              Log In
            </Link>
            <Link to="/signup" className="nav-link">
              Sign Up
            </Link>
          </>
        )}

        {loggedIn && (
          <Link
            to={isAdmin ? "/admin" : "/user"}
            className="nav-link nav-link-primary"
          >
            {username}
          </Link>
        )}
      </nav>
    </header>
  );
}

export default NavBar;
