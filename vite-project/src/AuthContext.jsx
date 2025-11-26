import React, { createContext, useContext, useEffect, useState } from "react";
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
