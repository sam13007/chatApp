import React, { useContext } from "react";

import { ChatContext } from "../context/ChatContext";

function PotentialChats() {
  const { potentialChats, createNewChatClick } = useContext(ChatContext);

  return (
    <div className="w-full bg-[#111B21] flex items-center ">
      <ul className="m-4 flex gap-2 w-full overflow-x-auto no-scrollbar">
        {potentialChats.map((pChat) => (
          <li
            className="bg-[#005C4B] text-white rounded-lg  px-2 py-1  w-fit cursor-pointer"
            key={pChat?.id}
            onClick={() => createNewChatClick(pChat.id)}
          >
            {pChat?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PotentialChats;
