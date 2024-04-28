import React, { useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { AppWrapper, Signup, Login, Chat } from "../pages";
import { AuthContext } from "../context/AuthContext";

function LoginRoutes() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={user?.name ? <Navigate to="/chat" /> : <AppWrapper />}
      >
        <Route path="/" index element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
      <Route
        path="/chat"
        element={user?.name ? <Chat /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default LoginRoutes;
