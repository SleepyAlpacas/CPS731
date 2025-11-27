import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuth, handleLogin } from "./UserProfileModule";


function LogIn() {
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function printLoginForm(){
    return (
      <div className="card">
        <h2>Log In</h2>

        <form onSubmit={(e) => handleLogin(e, setError, login, navigate)}>
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
    )
  }

  return (
    <div className="page">
      <NavBar />
      {printLoginForm()}
    </div>
  );
}

export default LogIn;
