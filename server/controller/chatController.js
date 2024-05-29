import chatModel from "../model/chatModel.js";

export const createChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.body;

    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).json(chat);
    }

    const newChat = new chatModel({ members: [firstId, secondId] });
    await newChat.save();
    return res.status(200).json(newChat);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findAllChat = async (req, res) => {
  try {
    const { firstId } = req.params;

    const chats = await chatModel.find({ members: { $in: [firstId] } });
    return res.status(200).json(chats);
  } catch (error) {
    console.log(error, "Error in getting All chats");
    return res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  try {
    const { firstId, secondId } = req.params;

    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    return res.status(200).json(chat);
  } catch (error) {
    return res.status(500).json(error);
  }
};
