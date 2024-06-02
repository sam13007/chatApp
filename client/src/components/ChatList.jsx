import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

import RecipientCard from "./RecipientCard.jsx";

function ChatList() {
  const { userChats } = useContext(ChatContext);

  // const recipientsList = useFetchRecipients(userChats, user);

  return (
    <div className="w-1/4">
      {userChats.map((chat) => (
        <div key={chat._id}>
          <RecipientCard chatDetail={chat} />
        </div>
      ))}
    </div>
  );
}

export default ChatList;
