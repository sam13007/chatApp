import {
  createChat,
  findAllChat,
  findChat,
} from "../controller/chatController.js";
import express from "express";

const router = express.Router();

router.post("/createChat", createChat);
router.get("/findAll/:firstId", findAllChat);
router.get("/find/:firstId/:secondId", findChat);

export default router;
