import React from "react";
import { Link } from "react-router";
import NavBar from "./components/NavBar";
import { getSetUserResults, checkLogIn, checkSignUp, logout, userIdLogin, getUserId } from "./UserProfileModule";

function UserProfileModule() {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const [username, setUsername] = React.useState(null);
  const [userResults, setUserResults] = React.useState([]);
  const [showPwdU, setShowPwdU] = React.useState(false);
  const [showPwdR, setShowPwdR] = React.useState(false);

  //check if user is already logged in
  React.useEffect(() => {
    const userId = document.cookie.match(/account_id=\d+/);
    if (userId) {
      userIdLogin(userId[0].split("=")[1], setLoggedIn, setUsername);
    }
  }, []);


  React.useEffect(() => {
    if (loggedIn){
        const userId = getUserId()
        getSetUserResults(userId, setUserResults)
    }
  }, [loggedIn]);

  function printLoginForm(){
    if (!loggedIn) {
        return (
            <div className="card">
            <h2>Login</h2>
            <input id="username" type="text" placeholder="Username" />
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

            <input type="button" value="Login" onClick={() => { checkLogIn(setLoggedIn, setUsername)}} />
            </div>
        )
        }
    }

function printSignUpForm(){
    if (!loggedIn){
        return (
        <div className="card">
          <h2>Sign Up</h2>
          <input id="usernameSignUp" type="text" placeholder="Username" />
          {/* <input id="passwordSignUp" type="password" placeholder="Password" /> */}
          <div className="password-wrapper">
            <input
              type={showPwdR ? "text" : "password"}
              placeholder="Password"
              id="passwordSignUp"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPwdR(!showPwdR)}
            >
              {showPwdR ? "Hide" : "Show"}
            </button>
          </div>

          <input type="button" value="Sign Up" onClick={() => {checkSignUp(setLoggedIn, setUsername)}} />
        </div>
      )}
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

function printLoggedInMenu() {
    if (loggedIn){
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
            <button className="button">
              <Link to="/questionnairemodule">Start Questionnaire</Link>
            </button>
            <button className="btn-logout" onClick={()=>{logout(setUsername, setLoggedIn, setUserResults)}}>
              Log Out
            </button>
          </div>
        </div>
      )
    }
}

  return (

    <div className="page">
      <NavBar />
        {printLoginForm()}
        {printSignUpForm()}
        
        {printLoggedInMenu()}
        {printUserResults()}
    </div>
  );
}
export default UserProfileModule;
