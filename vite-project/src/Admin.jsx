// import React from "react";
// import axios from "axios";
// import { Link } from "react-router";
// import NavBar from "./components/NavBar";

// function Admin() {
//   const [loggedIn, setLoggedIn] = React.useState(false);
//   const [showPwd, setShowPwd] = React.useState(false);

//   async function checkLogIn() {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;
//     const out = await axios.get(
//       `http://localhost:8080/account/${username}/${password}`
//     );
//     if (out.data[0] && out.data[0][0].is_admin == 1) {
//       setLoggedIn(true);
//       document.cookie = `account_id=${out.data[0][0].account_id}`;
//     }
//   }

//   function logout() {
//     document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
//     setLoggedIn(false);
//   }

//   React.useEffect(() => {
//     const checkUserLoggedIn = async (userId) => {
//       if (!loggedIn) {
//         const out = await axios.get(`http://localhost:8080/account/${userId}`);
//         if (out.data[0] && out.data[0][0].is_admin == 1) {
//           setLoggedIn(true);
//         }
//       }
//     };

//     const userId = document.cookie.match(/account_id=\d+/);
//     if (userId) {
//       checkUserLoggedIn(userId[0].split("=")[1]);
//     }
//   }, []);

//   return (
//     <div className="page">
//       <NavBar />
//       {!loggedIn && (
//         <div className="card">
//           <h2>Admin Login</h2>
//           <input type="text" id="username" placeholder="Username" />
//           {/* <input type="password" id="password" placeholder="Password" />*/}
//           <div className="password-wrapper">
//             <input
//               type={showPwd ? "text" : "password"}
//               placeholder="Password"
//               id="password"
//             />
//             <button
//               type="button"
//               className="password-toggle"
//               onClick={() => setShowPwd(!showPwd)}
//             >
//               {showPwd ? "Hide" : "Show"}
//             </button>
//           </div>
//           <input type="button" value="Login" onClick={checkLogIn} />
//         </div>
//       )}

//       {loggedIn && (
//         <div className="card profile-card">
//           <h2>Admin Tools</h2>
//           <div className="profile-actions">
//             <button className="btn">
//               <Link to={"/admin/answer"}>Answer Table</Link>
//             </button>
//             <button className="btn">
//               <Link to={"/admin/question"}>Question Table</Link>
//             </button>
//             <button className="btn-logout" onClick={logout}>
//               Log Out
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Admin;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useAuth } from "./AuthContext";

function Admin() {
  const { loggedIn, isAdmin, username, logout } = useAuth();
  const [userResults, setUserResults] = useState([]);
  const navigate = useNavigate();

  // Fetch this admin's questionnaire results (same as user page)
  useEffect(() => {
    const fetchResults = async () => {
      if (!loggedIn) return;

      const match = document.cookie.match(/account_id=\d+/);
      if (!match) return;

      const userId = match[0].split("=")[1];

      try {
        const out = await axios.get(`http://localhost:8080/result/${userId}`);
        setUserResults(out.data[0] || []);
      } catch (err) {
        console.error("Failed to fetch results", err);
      }
    };

    fetchResults();
  }, [loggedIn]);

  const handleLogout = () => {
    logout();
    setUserResults([]);
    navigate("/");
  };

  const renderResults = () => {
    if (!userResults.length) return null;

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
          <tbody>
            {userResults.map((r) => (
              <tr key={r.result_id}>
                <td>{r.outcome_id}</td>
                <td>{r.result_id}</td>
                <td>{r.score}</td>
                <td>{r.completion_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // in case user somehow get to admin page, this allows only admins to see this page
  if (!loggedIn || !isAdmin) {
    return (
      <div className="page">
        <NavBar />
        <div className="card">
          <h2>Admin Only</h2>
          <p>You must be signed in as an admin to view this page.</p>
          <Link to="/login" className="btn-primary-link">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <NavBar />
      <div className="card profile-card">
        <div className="profile-header">
          <div>
            <p className="profile-label">Logged in as</p>
            <h1 className="profile-username">{username}</h1>
          </div>
        </div>

        <p className="profile-subtitle">
          Start a questionnaire, review your results, or manage questions and
          answers.
        </p>

        <div className="profile-actions">
          <button>
            <Link to="/questionnairemodule" className="btn-primary-link">
              Start Questionnaire
            </Link>
          </button>

          <button>
            <Link to="/admin/question" className="btn-primary-link">
              Manage Questions
            </Link>
          </button>

          <button>
            <Link to="/admin/answer" className="btn-primary-link">
              Manage Answers
            </Link>
          </button>

          <button>
            <Link to="/admin/outcome" className="btn-primary-link">
              Manage Outcomes
            </Link>
          </button>

          <button>
            <Link to="/admin/account" className="btn-primary-link">
              Manage Accounts
            </Link>
          </button>

          <button className="btn-logout" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {renderResults()}
    </div>
  );
}

export default Admin;
