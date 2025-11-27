import React from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router";
import NavBar from "./components/NavBar";
import {
  getUserResults,
  // checkLogIn,
  // checkSignUp,
  // logout,
  // userIdLogin,
  // getUserId,
} from "./UserProfileModule";
import { useAuth } from "./AuthContext";

function UserProfileModule() {
  // const [loggedIn, setLoggedIn] = React.useState(null);
  // const [username, setUsername] = React.useState(null);
  const [userResults, setUserResults] = React.useState([]);
  const [showPwdU] = React.useState(false);
  // const [showPwdR, setShowPwdR] = React.useState(false);
  const { loggedIn, username, logout } = useAuth();
  const navigate = useNavigate();

  //check if user is already logged in
  // React.useEffect(() => {
  //   const userId = document.cookie.match(/account_id=\d+/);
  //   if (userId) {
  //     userIdLogin(userId[0].split("=")[1], setLoggedIn, setUsername);
  //   }
  // }, []);

  React.useEffect(() => {
    if (!loggedIn) {
      setUserResults([]);
      return;
    }

    // get userId from cookie (same pattern as before)
    const match = document.cookie.match(/account_id=\d+/);
    if (!match) return;
    const userId = match[0].split("=")[1];

    getUserResults(userId, setUserResults);
    // if (loggedIn) {
    //   const userId = getUserId();
    //   getUserResults(userId, setUserResults);
    // }
  }, [loggedIn]);

  // function printLoginForm() {
  //   if (!loggedIn) {
  //     return (
  //       <div className="card">
  //         <h2>Login</h2>
  //         <input id="username" type="text" placeholder="Username" />
  //         <div className="password-wrapper">
  //           <input
  //             type={showPwdU ? "text" : "password"}
  //             placeholder="Password"
  //             id="password"
  //           />
  //           <button
  //             type="button"
  //             className="password-toggle"
  //             onClick={() => setShowPwdU(!showPwdU)}
  //           >
  //             {showPwdU ? "Hide" : "Show"}
  //           </button>
  //         </div>

  //         <input
  //           type="button"
  //           value="Login"
  //           onClick={() => {
  //             checkLogIn(setLoggedIn, setUsername);
  //           }}
  //         />
  //       </div>
  //     );
  //   }
  // }

  // function printSignUpForm() {
  //   if (!loggedIn) {
  //     return (
  //       <div className="card">
  //         <h2>Sign Up</h2>
  //         <input id="usernameSignUp" type="text" placeholder="Username" />
  //         {/* <input id="passwordSignUp" type="password" placeholder="Password" /> */}
  //         <div className="password-wrapper">
  //           <input
  //             type={showPwdR ? "text" : "password"}
  //             placeholder="Password"
  //             id="passwordSignUp"
  //           />
  //           <button
  //             type="button"
  //             className="password-toggle"
  //             onClick={() => setShowPwdR(!showPwdR)}
  //           >
  //             {showPwdR ? "Hide" : "Show"}
  //           </button>
  //         </div>

  //         <input
  //           type="button"
  //           value="Sign Up"
  //           onClick={() => {
  //             checkSignUp(setLoggedIn, setUsername);
  //           }}
  //         />
  //       </div>
  //     );
  //   }
  // }

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
