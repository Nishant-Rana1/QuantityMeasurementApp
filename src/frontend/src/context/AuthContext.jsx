import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("measurepro_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    function loadUser() {
      const stored = localStorage.getItem("measurepro_user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    }

    window.addEventListener("storage", loadUser);
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  const login = (userData) => {
    localStorage.setItem("measurepro_user", JSON.stringify(userData));
    setUser(userData);
    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    localStorage.removeItem("measurepro_user");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
    // Redirect to backend logout to clear JSESSIONID and session authentication
    window.location.href = "/logout";
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user && !!user.token,
    login,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
}
