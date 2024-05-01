import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ChatHeader() {
  const {
    user: { name },
    setUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#222E35] h-[10%]">
      <div className="flex justify-between items-center h-full px-4 text-2xl">
        <h2> Hello, {name}</h2>
        <div
          className="hover:cursor-pointer"
          onClick={() => {
            sessionStorage.removeItem("user");
            navigate("/");
            setUser({});
          }}
        >
          Logout
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
