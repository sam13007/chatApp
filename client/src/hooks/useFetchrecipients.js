import { useEffect, useState } from "react";
import { fetchUserDetails } from "../utils/apiService";

const useFetchrecipients = (chatDetail, user) => {
  const [recipientsList, setRecipientsList] = useState([]);

  useEffect(() => {
    const recipientmember = chatDetail.members.find(
      (member) => member !== user.id
    );

    const fetchRecipientDetails = async (recipient) => {
      const { data } = await fetchUserDetails(recipient);

      setRecipientsList(data);
    };

    fetchRecipientDetails(recipientmember);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatDetail, user]);

  return recipientsList;
};

export default useFetchrecipients;
