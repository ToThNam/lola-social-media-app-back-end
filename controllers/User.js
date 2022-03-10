import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ errror: err });
  }
};

export const searchUser = async (req, res) => {
  try {
    const keySearch = req.body.keySearch;
    const user = await User.find({
      $or: [
        { firstName: { $regex: keySearch } },
        { lastName: { $regex: keySearch } },
        { email: { $regex: keySearch } },
      ],
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errror: err });
  }
};

export const getUserByID = async (req, res) => {
  try {
    const userID = req.body._id;
    const user = await User.findById(userID);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errror: err });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updateUser = req.body;
    const user = new User.findOneAndUpdate(
      { _id: updateUser._id },
      updateUser,
      { new: true }
    );
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errror: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteUser = req.body;
    const user = await User.findByIdAndRemove({ _id: deleteUser._id });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ errror: err });
  }
};
