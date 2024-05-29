import { createMessage, getMessages } from "../controller/messageController.js";
import express from "express";

const router = express.Router();

router.post("/createMessage", createMessage);
router.get("/:chatId", getMessages);

export default router;
