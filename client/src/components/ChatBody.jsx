import React, { useContext } from "react";

import InputEmoji from "react-input-emoji";
import { ChatContext } from "../context/ChatContext";
import MessageBox from "./MessageBox.jsx";

import NoMessage from "./NoMessage.jsx";

function ChatBody({ user }) {
  const { selectedChatId, sendMessage, message, setMessage, chats } =
    useContext(ChatContext);

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
