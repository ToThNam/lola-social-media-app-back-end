import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { v1 } from "uuid";
import { autheticationSchema } from "../validation/authenticationValid.js";

const uuidv1 = v1;

export const register = async (req, res) => {
  try {
    await autheticationSchema.validateAsync(req.body, { abortEarly: false });
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      res.status(200).json({
        registerMessage: `Email ${email} already available!`,
        status: "fail",
      });
    } else {
      const user = new User({
        email,
        password,
        firstName: "User",
        lastName: "Name",
        image: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
      });
      await user.save();
      const findUserToLogin = await User.find({ email });
      const secretKey = uuidv1();
      const token = jwt.sign({ _id: findUserToLogin._id }, `${secretKey}`);
      res.status(200).json({
        secretKey,
        token,
        registerMessage: `Email ${email} registesred successfully!`,
        status: "success",
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
          signInMessage: "Sign In successfully!",
          status: "success",
        });
      } else {
        res.status(200).json({
          signInMessage: "Invalid Password, Please try again",
          status: "fail",
        });
      }
    } else {
      res.status(200).json({
        signInMessage: `Email ${email} not available!`,
        status: "fail",
      });
    }
  } catch (err) {
    res.status(500).json({ errror: err });
  }
};
