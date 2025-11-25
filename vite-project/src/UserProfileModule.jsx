import React from "react";
import axios from "axios";
import { Link } from "react-router";
import NavBar from "./components/NavBar";

function UserProfileModule() {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [userResults, setUserResults] = React.useState([]);
  const [showPwdU, setShowPwdU] = React.useState(false);
  const [showPwdR, setShowPwdR] = React.useState(false);

  function logout() {
    document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setUsername(null);
    setLoggedIn(null);
    setUserResults([]);
  }

  //check if user is already logged in
  React.useEffect(() => {
    const getUsername = async (userId) => {
      if (username == null) {
        const out = await axios.get(`http://localhost:8080/account/${userId}`);
        if (out.data[0].length == 1) {
          setLoggedIn(true);
          setUsername(out.data[0][0].account_username);
        }
      }
    };

    const userId = document.cookie.match(/account_id=\d+/);
    if (userId) {
      getUsername(userId[0].split("=")[1]);
    }
  }, [loggedIn]);

  async function checkLogIn() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const out = await axios.get(
      `http://localhost:8080/account/${username}/${password}`
    );
    if (out.data[0].length) {
      setLoggedIn(out.data[0][0].account_id);
      setUsername(out.data[0][0].account_username);
      console.log(out.data[0][0].account_id);
      document.cookie = `account_id=${out.data[0][0].account_id}`;
    }
  }

  async function checkSignUp() {
    const username = document.getElementById("usernameSignUp").value;
    const password = document.getElementById("passwordSignUp").value;
    const account = {
      account_username: username,
      account_password: password,
      is_admin: false,
    };
    const out = await axios.post(`http://localhost:8080/account`, account);
    console.log(typeof out.data != "object");
    console.log(out.data);
    if (Array.isArray(out.data)) {
      document.cookie = `account_id=${out.data[0].insertId}`;
      setLoggedIn(true);
    }
  }

  function printUserResults() {
    if (userResults.length) {
      const outcomeTable = userResults.map((outcome) => (
        <tr>
          <td>{outcome.outcome_id}</td>
          <td>{outcome.result_id}</td>
          <td>{outcome.score}</td>
          <td>{outcome.completion_time}</td>
        </tr>
      ));
      console.log(outcomeTable);
      return (
        <table>
          <tbody>
            <tr>
              <td>outcome id</td>
              <td>result id</td>
              <td>score</td>
              <td>completion time</td>
            </tr>
            {outcomeTable}
          </tbody>
        </table>
      );
    }
  }

  React.useEffect(() => {
    const getUserResults = async () => {
      if (loggedIn) {
        const userId = document.cookie.match(/account_id=\d+/)[0].split("=")[1];
        const out = await axios.get(`http://localhost:8080/result/${userId}`);
        setUserResults(out.data[0]);
      }
    };
    getUserResults();
  }, [loggedIn]);

  return (
    // <>
    //   {!loggedIn && (
    //     <form>
    //       <label>Username</label>
    //       <input type="text" id="username" />
    //       <label>Password</label>
    //       <input type="password" id="password" />
    //       <input type="button" value={"login"} onClick={checkLogIn} />
    //     </form>
    //   )}
    //   {!loggedIn && (
    //     <form>
    //       <label>Username</label>
    //       <input type="text" id="usernameSignUp" />
    //       <label>Password</label>
    //       <input type="password" id="passwordSignUp" />
    //       <input type="button" value={"signup"} onClick={checkSignUp} />
    //     </form>
    //   )}
    //   {loggedIn && <h1>You're logged in user: {username}</h1>}
    //   {loggedIn && <button onClick={logout}>Logout</button>}
    //   {loggedIn && (
    //     <button>
    //       <Link to={"/questionnairemodule"}>Questionnaire Module</Link>
    //     </button>
    //   )}
    //   {printUserResults()}
    // </>
    <div className="page">
      <NavBar />
      {!loggedIn && (
        <div className="card">
          <h2>Login</h2>
          <input id="username" type="text" placeholder="Username" />
          {/* <input id="password" type="password" placeholder="Password" /> */}
          <div className="password-wrapper">
            <input
              type={showPwdU ? "text" : "password"}
              placeholder="Password"
              id="password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPwdU(!showPwdU)}
            >
              {showPwdU ? "Hide" : "Show"}
            </button>
          </div>

          <input type="button" value="Login" onClick={checkLogIn} />
        </div>
      )}

      {!loggedIn && (
        <div className="card">
          <h2>Sign Up</h2>
          <input id="usernameSignUp" type="text" placeholder="Username" />
          {/* <input id="passwordSignUp" type="password" placeholder="Password" /> */}
          <div className="password-wrapper">
            <input
              type={showPwdR ? "text" : "password"}
              placeholder="Password"
              id="password"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPwdR(!showPwdR)}
            >
              {showPwdR ? "Hide" : "Show"}
            </button>
          </div>

          <input type="button" value="Sign Up" onClick={checkSignUp} />
        </div>
      )}

      {loggedIn && (
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
            <button className="button">
              <Link to="/questionnairemodule">Start Questionnaire</Link>
            </button>
            <button className="btn-logout" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      )}

      {printUserResults()}
    </div>
  );
}
export default UserProfileModule;
