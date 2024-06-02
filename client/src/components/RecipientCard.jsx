import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Avatar from "../assets/avatar.svg";

function RecipientCard({ recipientDetail }) {
  const { setSelectedChatId, selectedChatId } = useContext(ChatContext);

  const handleSelectedChat = (selectedId) => {
    setSelectedChatId(selectedId);
  };

  return (
    <div
      className={`w-full  flex px-1 pt-4 gap-2 items-center  hover:bg-gray-800 ${
        selectedChatId === recipientDetail?.id ? "bg-gray-700" : "bg-[#111B21]"
      }`}
      onClick={() => handleSelectedChat(recipientDetail.id)}
    >
      <img src={Avatar} alt="alt" width={50} className="mx-4 " />
      <div className=" border-b-[1px] border-b-gray-700 flex flex-col w-full px-2 py-4 gap-1">
        <div className="flex items-center justify-between">
          <p className="text-white text-2xl font-semibold">
            {recipientDetail.name}
          </p>
          <p className="text-gray-400 text-lg font-normal">8:35</p>
        </div>
        <div className="text-gray-300 text-lg font-light">Message</div>
      </div>
    </div>
  );
}

export default RecipientCard;
