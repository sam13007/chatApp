import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";

function ChatBody() {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("message", message);
    setMessage("");
  };

  return (
    <div className=" bg-[#3d3d3ddb] h-full grow flex flex-col justify-between">
      <div></div>
      <form
        className="flex justify-center gap-4 p-4 items-center bg-[#111B21]"
        onSubmit={sendMessage}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type message here"
          className="outline-none border border-black py-2 px-4 rounded-lg bg-[#222e3597] w-[90%] my-2"
        />
        <GoSmiley size={20} />
        <FaPaperPlane size={20} type="submit" />
      </form>
    </div>
  );
}

export default ChatBody;
