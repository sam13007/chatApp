import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import useFetchRecipients from "../hooks/useFetchrecipients.ts";
import RecipientCard from "./RecipientCard.jsx";

function ChatList({ user }) {
  const { userChats } = useContext(ChatContext);

  const recipientsList = useFetchRecipients(userChats, user);

  return (
    <div className="w-1/4">
      {recipientsList.map((recipient) => (
        <div key={recipient.id}>
          <RecipientCard recipientDetail={recipient} />
        </div>
      ))}
    </div>
  );
}

export default ChatList;
