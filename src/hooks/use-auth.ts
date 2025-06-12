import { useState, useEffect } from "react";

interface SessionData {
  isAuthenticated: boolean;
  expiresAt: number;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    const sessionStr = localStorage.getItem("session");
    if (sessionStr) {
      const session: SessionData = JSON.parse(sessionStr);
      const now = new Date().getTime();
      
      if (session.expiresAt > now) {
        setIsAuthenticated(true);
      } else {
        // Session expired
        localStorage.removeItem("session");
        setIsAuthenticated(false);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("session");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
    logout,
  };
} 