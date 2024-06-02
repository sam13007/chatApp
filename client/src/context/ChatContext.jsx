import { createContext, useEffect, useState } from "react";
import { fetchUserChatsAPI } from "../utils/apiService";
export const ChatContext = createContext();

const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState([]);
  const [isChatsLoading, setIsChatsLoading] = useState(false);
  const [isChatsError, setIsChatsError] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");

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

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isChatsError,
        isChatsLoading,
        selectedChatId,
        setSelectedChatId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;
