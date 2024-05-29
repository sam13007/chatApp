import messageModel from "../model/messageModel.js";

export const createMessage = async (req, res) => {
  const { chatId, text, senderId } = req.body;

  const message = new messageModel({
    chatId,
    text,
    senderId,
  });
  try {
    const response = await message.save();

    res.status(200).json(response);
  } catch (error) {
    console.log("Error in creating message", error);
    res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getting messages", error);
    res.status(500).json(error);
  }
};
