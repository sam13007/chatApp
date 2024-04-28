import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

const generateToken = (user_id) => {
  const jwtKey = process.env.SECRET_KEY;

  return jwt.sign({ user_id }, jwtKey, { expiresIn: "2d" });
};

export const getAllUsersRoute = async (req, res) => {
  try {
    let users = await userModel.find();

    users = users.map((user) => {
      return { id: user._id, name: user.name, email: user.email };
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(`Error in registering user ${error}`);
  }
};

export const getUserRoute = async (req, res) => {
  try {
    let user = await userModel.findById(req.params.userId);

    user = { id: user._id, name: user.name, email: user.email };

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`Something went wrong ${error}`);
  }
};

export const registerUserRoute = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    let user = await userModel.findOne({ email });

    if (!name || !password || !email)
      return res.status(400).json("All fields are required...");

    if (user) return res.status(400).json("Email already registered");

    if (!validator.isEmail(email) || !validator.isStrongPassword(password))
      return res.status(400).json("Invalid email or password");

    user = new userModel({ name, password, email });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    const jsonToken = generateToken(user._id);
    return res
      .status(200)
      .json({ jwt: jsonToken, email: user.email, name: user.name });
  } catch (error) {
    return res.status(500).json(`Error in registering user ${error}`);
  }
};

export const loginUserRoute = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await userModel.findOne({ email });
    if (!user) return res.status(400).json("Invalid email or password");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword)
      return res.status(400).json("Invalid email or password");
    const jwtToken = generateToken(user._id);

    return res
      .status(200)
      .json({ jwtToken, email, name: user.name, id: user._id });
  } catch (error) {
    return res.status(500).json(`Error in logging in user ${error}`);
  }
};
