import { useEffect, useState } from "react";
import { fetchUserDetails } from "../utils/apiService";

const useFetchrecipients = (userChats, user) => {
  const [recipientsList, setRecipientsList] = useState<any>([]);

  useEffect(() => {
    const recipientmembers = userChats.map((chat) =>
      chat.members.find((member) => member !== user.id)
    );

    const fetchRecipientDetails = async (recipient) => {
      const { data } = await fetchUserDetails(recipient);

      setRecipientsList((list) => [...list, data]);
    };

    recipientmembers.forEach((recipient) => {
      fetchRecipientDetails(recipient);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userChats, user]);

  return recipientsList;
};

export default useFetchrecipients;
