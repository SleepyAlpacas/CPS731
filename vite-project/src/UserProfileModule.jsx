import axios from "axios";

export function logout(setUsername, setLoggedIn, setUserResults) {
  document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  setUsername(null);
  setLoggedIn(null);
  setUserResults([]);
}

export function getUserId(){
  const userId = document.cookie.match(/account_id=\d+/);
  if (userId) return userId[0].split("=")[1]
}

export async function userIdLogin (userId, setLoggedIn, setUsername) {
  if (userId) {
    const out = await axios.get(`http://localhost:8080/account/${userId}`);
    if (out.data[0].length == 1) {
      setLoggedIn(true);
      setUsername(out.data[0][0].account_username);
    }
  }
}

export async function checkLogIn(setLoggedIn, setUsername) {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const out = await axios.get(
    `http://localhost:8080/account/${username}/${password}`
  );
  if (out.data[0].length) {
    //setLoggedIn(out.data[0][0].account_id);
    setLoggedIn(true)
    setUsername(out.data[0][0].account_username);
    document.cookie = `account_id=${out.data[0][0].account_id}`;
    return out.data[0][0].account_username
  }
}

export async function getSetUserResults(userId, setUserResults) {
    const out = await axios.get(`http://localhost:8080/result/${userId}`);
    setUserResults(out.data[0]);
};

export async function checkSignUp(setLoggedIn, setUsername) {
  const username = document.getElementById("usernameSignUp").value;
  const password = document.getElementById("passwordSignUp").value;
  const account = {
    account_username: username,
    account_password: password,
    is_admin: false,
  };
  const out = await axios.post(`http://localhost:8080/account`, account);
  
  if (Array.isArray(out.data)) {
    document.cookie = `account_id=${out.data[0].insertId}`;
    setLoggedIn(true);
    setUsername(username)
  }
}


