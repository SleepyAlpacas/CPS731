import React from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router";
import NavBar from "./components/NavBar";
import {
  getSetUserResults,
} from "./UserProfileModule";
import { useAuth } from "./AuthContext";

function UserProfileModule() {
  const [userResults, setUserResults] = React.useState([]);
  const [showPwdU] = React.useState(false);
  const { loggedIn, username, logout } = useAuth();
  const navigate = useNavigate();



  React.useEffect(() => {
    if (!loggedIn) {
      setUserResults([]);
      return;
    }

    // get userId from cookie (same pattern as before)
    const match = document.cookie.match(/account_id=\d+/);
    if (!match) return;
    const userId = match[0].split("=")[1];

    getSetUserResults(userId, setUserResults);
  }, [loggedIn]);


  function printUserResults() {
    if (!userResults.length) return null;

    const outcomeTable = userResults.map((outcome) => (
      <tr>
        <td>{outcome.outcome_id}</td>
        <td>{outcome.result_id}</td>
        <td>{outcome.score}</td>
        <td>{outcome.completion_time}</td>
      </tr>
    ));

    return (
      <div className="card results-card">
        <h2>Your Questionnaire History</h2>
        <table className="results-table">
          <thead>
            <tr>
              <th>Outcome ID</th>
              <th>Result ID</th>
              <th>Score</th>
              <th>Completion Time</th>
            </tr>
          </thead>
          <tbody>{outcomeTable}</tbody>
        </table>
      </div>
    );
  }

  function printLoggedInMenu() {
    if (!loggedIn) return null;
    return (
      <div className="card profile-card">
        <div className="profile-header">
          <div>
            <p className="profile-label">Logged in as</p>
            <h1 className="profile-username">{username}</h1>
          </div>
        </div>

        <p className="profile-subtitle">
          Start a new questionnaire or review your previous results.
        </p>

        <div className="profile-actions">
          <button>
            <Link to="/questionnairemodule" className="btn-primary-link">
              Start Questionnaire
            </Link>
          </button>
          <button
            className="btn-logout"
            onClick={() => {
              logout();
              setUserResults([]);
              navigate("/");
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <NavBar />
      {printLoggedInMenu()}
      {printUserResults()}
    </div>
  );
}
export default UserProfileModule;
