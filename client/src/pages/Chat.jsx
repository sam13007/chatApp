import React from "react";
import { ChatHeader, ChatBody } from "../components";

function Chat() {
  return (
    <div className="  bg-[#111B21] text-slate-100 h-full ">
      <ChatHeader />
      <div className="h-[90%] flex ">
        <div className="w-1/4"></div>
        <ChatBody />
      </div>
    </div>
  );
}

export default Chat;
