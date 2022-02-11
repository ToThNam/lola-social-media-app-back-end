import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { v1 } from "uuid";
import { registerSchema, autheticationSchema } from "../validation/register.js";

const uuidv1 = v1;

export const register = async (req, res) => {
  try {
    await registerSchema.validateAsync(req.body, { abortEarly: false });
    const { email, password, firstName, lastName } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(200).json({
        message: `Email ${email} already available!`,
      });
    } else {
      const user = new User({
        email,
        password,
        firstName,
        lastName,
        image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
      await user.save();
      const findUserToLogin = await User.find({ email });
      const secretKey = uuidv1();
      const token = jwt.sign({ _id: findUserToLogin._id }, `${secretKey}`);
      res.status(200).json({
        secretKey,
        token,
        message: `Email ${email} registesred successfully!`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const signIn = async (req, res) => {
  try {
    await autheticationSchema.validateAsync(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      if (findUser.password === password) {
        const secretKey = uuidv1();
        const token = jwt.sign({ _id: findUser._id }, `${secretKey}`);
        res.status(200).json({
          secretKey,
          token,
          message: "Sign In successfully!",
        });
      } else {
        res.status(200).json({
          message: "Invalid Password, Please try again",
        });
      }
    } else {
      res.status(200).json({
        message: `Email ${email} not available!`,
      });
    }
  } catch (err) {
    res.status(500).json({ errror: err });
  }
};
