import React, { useContext, useEffect, useState } from "react";
import { fetchChats } from "../utils/apiService.js";
// import { FaPaperPlane } from "react-icons/fa";
// import { GoSmiley } from "react-icons/go";
import InputEmoji from "react-input-emoji";
import { ChatContext } from "../context/ChatContext";

function ChatBody() {
  const { selectedChatId } = useContext(ChatContext);

  const [chats, setChats] = useState(null);

  useEffect(() => {
    const fetchChatFromChatId = async (chatId) => {
      try {
        const { data } = await fetchChats(chatId);
        console.log(data);
      } catch (error) {
        console.log("Error in fetching chats", error);
      }
    };

    if (selectedChatId) {
      fetchChatFromChatId(selectedChatId);
    }
  }, [selectedChatId]);

  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message", message);
    setMessage("");
  };

  return (
    <div className=" bg-[rgba(61,61,61,0.86)] h-full grow flex flex-col justify-between">
      {selectedChatId ? (
        <>
          <div></div>
          <InputEmoji />
          {/* </form> */}
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="bg-gray-900 px-4 py-1 rounded-xl">
            No Messages to display
          </p>
        </div>
      )}
    </div>
  );
}

export default ChatBody;
