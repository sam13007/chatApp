import React, { useContext, useEffect, useState } from "react";
import { fetchChats, postCreateMessage } from "../utils/apiService.js";
// import { FaPaperPlane } from "react-icons/fa";
// import { GoSmiley } from "react-icons/go";
import InputEmoji from "react-input-emoji";
import { ChatContext } from "../context/ChatContext";
import MessageBox from "./MessageBox.jsx";

import NoMessage from "./NoMessage.jsx";

function ChatBody({ user }) {
  const { selectedChatId } = useContext(ChatContext);

  const [chats, setChats] = useState(null);

  useEffect(() => {
    const fetchChatFromChatId = async (chatId) => {
      try {
        const { data } = await fetchChats(chatId);
        setChats(data);
      } catch (error) {
        console.log("Error in fetching chats", error);
      }
    };

    if (selectedChatId) {
      fetchChatFromChatId(selectedChatId);
    }
  }, [selectedChatId]);

  const [message, setMessage] = useState("");

  const sendMessage = async (message) => {
    try {
      if (user && selectedChatId) {
        const requestBody = {
          chatId: selectedChatId,
          senderId: user.id,

          text: message,
        };

        const { data } = await postCreateMessage(requestBody);

        console.log(data);
        setMessage("");
      }
    } catch (err) {
      console.log(err, "Error in sending message");
    }
  };

  return (
    <div className=" bg-[rgba(61,61,61,0.86)] h-full grow flex flex-col justify-between">
      {selectedChatId ? (
        <>
          {chats?.length > 0 ? (
            <div className="m-3 h-full flex flex-col justify-end">
              {chats.map((message) => (
                <MessageBox message={message} key={message._id} />
              ))}
            </div>
          ) : (
            <NoMessage />
          )}

          <InputEmoji
            background="rgba(61,61,61,0.86)"
            borderColor="black"
            borderRadius={18}
            value={message}
            onChange={setMessage}
            cleanOnEnter
            onEnter={sendMessage}
            placeholder="Type a message"
            color="white"
            theme="dark"
          />
        </>
      ) : (
        <NoMessage />
      )}
    </div>
  );
}

export default ChatBody;
