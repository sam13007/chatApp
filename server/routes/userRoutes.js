import express from "express";
import {
  registerUserRoute,
  loginUserRoute,
  getAllUsersRoute,
  getUserRoute,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", registerUserRoute);
router.post("/login", loginUserRoute);
router.get("/", getAllUsersRoute);
router.get("/:userId", getUserRoute);

export default router;
