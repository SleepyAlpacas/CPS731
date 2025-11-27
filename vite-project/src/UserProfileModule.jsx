import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    loggedIn: false,
    username: null,
    isAdmin: false,
  });

  // On first load, try to restore from cookie
  useEffect(() => {
    const match = document.cookie.match(/account_id=\d+/);
    if (!match) return;

    const userId = match[0].split("=")[1];

    const restore = async () => {
      try {
        const out = await axios.get(`http://localhost:8080/account/${userId}`);
        if (out.data[0] && out.data[0][0]) {
          const user = out.data[0][0];
          setAuth({
            loggedIn: true,
            username: user.account_username,
            isAdmin: user.is_admin === 1,
          });
        }
      } catch (e) {
        console.error("Failed to restore session", e);
      }
    };

    restore();
  }, []);

  const login = ({ account_id, account_username, is_admin }) => {
    document.cookie = `account_id=${account_id}`;
    setAuth({
      loggedIn: true,
      username: account_username,
      isAdmin: is_admin === 1,
    });
  };

  const logout = () => {
    document.cookie = "account_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setAuth({ loggedIn: false, username: null, isAdmin: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export async function getSetUserResults(userId, setUserResults) {
    const out = await axios.get(`http://localhost:8080/result/${userId}`);
    setUserResults(out.data[0]);
};

export async function handleLogin(e, setError, login, navigate) {
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

  export async function handleSignup(e, setError, login, navigate) {
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