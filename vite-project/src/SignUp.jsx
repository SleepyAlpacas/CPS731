import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuth } from "./AuthContext";

function SignUp() {
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
      const account = {
        account_username: username,
        account_password: password,
        is_admin: false, // signups are normal users
      };

      const out = await axios.post("http://localhost:8080/account", account);

      if (Array.isArray(out.data)) {
        const insertId = out.data[0].insertId;

        login({
          account_id: insertId,
          account_username: username,
          is_admin: 0,
        });

        navigate("/user");
      } else {
        setError("Unable to sign up. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to sign up. Please try again.");
    }
  }

  return (
    <div className="page">
      <NavBar />
      <div className="card">
        <h2>Sign Up</h2>

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

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
