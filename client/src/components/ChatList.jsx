import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";

import RecipientCard from "./RecipientCard.jsx";
import PotentialChats from "./PotentialChats.jsx";

function ChatList() {
  const { userChats } = useContext(ChatContext);

  // const recipientsList = useFetchRecipients(userChats, user);

  return (
    <div className="w-1/4 flex flex-col justify-between">
      <div>
        {userChats.map((chat) => (
          <div key={chat._id}>
            <RecipientCard chatDetail={chat} />
          </div>
        ))}
      </div>

      <PotentialChats />
    </div>
  );
}

export default ChatList;
