import { createContext, useEffect, useState, useCallback } from "react";
import { fetchUserChatsAPI, fetchUsers } from "../utils/apiService";
import {
  createNewChat,
  postCreateMessage,
  fetchChats,
} from "../utils/apiService";
export const ChatContext = createContext();

const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [isChatsError, setIsChatsError] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const [potentialChats, setPotentialChats] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserChats = async () => {
      try {
        setIsChatsLoading(true);
        const { data } = await fetchUserChatsAPI(user?.id);
        if (data) {
          setUserChats(data);
          setIsChatsLoading(false);
          setIsChatsError(null);
        }
      } catch (error) {
        console.log("Error in fetching ", error);
        setIsChatsError(true);
        setIsChatsLoading(false);
      }
    };

    fetchUserChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data: users } = await fetchUsers();

        const pUsers = users.filter((u) => {
          if (u.id === user.id) return false;
          let isUserChatCreated = false;
          if (userChats) {
            isUserChatCreated = userChats?.some((chat) => {
              return chat.members[0] === u.id || chat.members[1] === u.id;
            });
          }
          return !isUserChatCreated;
        });

        setPotentialChats(pUsers);
      } catch (error) {
        console.log("Error in fetching chats", error);
      }
    };

    getUsers();
  }, [userChats, user.id]);

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

  const createNewChatClick = useCallback(
    async (secondId) => {
      try {
        const reqBody = {
          firstId: user.id,
          secondId: secondId,
        };

        const { data } = await createNewChat(reqBody);

        setUserChats((prev) => [...prev, data]);
      } catch (error) {
        console.log("Error in creating new chat", error);
      }
    },
    [user.id]
  );

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
        setChats((prev) => [...prev, data]);
        setMessage("");
      }
    } catch (err) {
      console.log(err, "Error in sending message");
    }
  };
  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatsError,
        isChatsLoading,
        selectedChatId,
        setSelectedChatId,
        potentialChats,
        sendMessage,
        createNewChatClick,
        message,
        setMessage,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
