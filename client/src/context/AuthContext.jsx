import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData)
      setUser({ name: userData.name, email: userData.email, id: userData.id });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
