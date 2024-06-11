import React, { Fragment, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import moment from "moment";

function MessageBox({ message }) {
  const { user } = useContext(AuthContext);

  const isSentByUser = user.id === message.senderId;

  const sentTime = () => {
    // console.log(moment(message.createdAt).isSame(moment, "day"));
    if (moment(message.createdAt).isSame(moment(), "day")) {
      return moment(message.createdAt).format("HH:mm");
    } else {
      return moment(message.createdAt).format("DD/MM");
    }
  };

  return (
    <div className={`flex flex-col-reverse my-1 `}>
      <div
        className={`bg-[#202C33] w-max px-2 py-2 ${
          isSentByUser ? "self-end" : "self-start"
        } shadow-lg`}
      >
        <span className=" p-2 text-xl">{message?.text}</span>
        <span className="text-sm text-gray-500">{sentTime()}</span>
      </div>
    </div>
  );
}

export default MessageBox;
