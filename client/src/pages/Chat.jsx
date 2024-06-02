import React, { useContext } from "react";
import { ChatHeader, ChatBody } from "../components";
import ChatContextProvider from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import ChatList from "../components/ChatList";

function Chat() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <div className="  bg-[#111B21] text-slate-100 h-full ">
        <ChatHeader />
        <div className="h-[90%] flex ">
          <ChatList user={user} />

          <ChatBody />
        </div>
      </div>
    </ChatContextProvider>
  );
}

export default Chat;
