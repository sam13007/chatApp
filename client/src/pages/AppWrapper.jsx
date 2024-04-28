import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function AppWrapper() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center bg-[#111B21] text-slate-100  h-full">
      <h1 className="text-2xl font-bold  ">Chat Application</h1>
      <div className="flex gap-4 ">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "text-blue-300 border-b-[1px] border-blue-300" : ""
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-300 border-b-[1px] border-blue-300" : ""
          }
        >
          Sign up
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default AppWrapper;
