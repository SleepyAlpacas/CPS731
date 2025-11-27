import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuth } from "./AuthContext";

function LogIn() {
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();

    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }

    try {
      const out = await axios.get(
        `http://localhost:8080/account/${username}/${password}`
      );

      if (out.data[0] && out.data[0].length) {
        const user = out.data[0][0]; // account_id, account_username, is_admin
        login(user);

        if (user.is_admin === 1) {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      } else {
        setError("Invalid username or password.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to sign in. Please try again.");
    }
  }

  return (
    <div className="page">
      <NavBar />
      <div className="card">
        <h2>Log In</h2>

        <form onSubmit={handleSubmit}>
          <input name="username" type="text" placeholder="Username" />

          <div className="password-wrapper">
            <input
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="Password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p style={{ color: "#f97373", fontSize: "0.85rem" }}>{error}</p>
          )}

          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
