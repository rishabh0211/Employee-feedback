const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUserById = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.userId });
  if (!user) {
    return res.status(404).send({
      message: "Cannot find user with the given id"
    });
  }
  req.profile = user;
  const profileId = mongoose.Types.ObjectId(req.profile._id);
  if (req.user && profileId.equals(req.user._id)) {
    req.isAuthUser = true;
    return next();
  }
  next();
};

exports.getUserProfile = async (req, res) => {
  res.json(req.profile);
};

exports.updateUser = async (req, res, next) => {
  req.body.updatedAt = new Date().toISOString();
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, runValidators: true }
  );
  res.json(updatedUser);
};

exports.deleteProfile = async (req, res) => {
  const { userId } = req.params;
  const deletedUser = await User.findByIdAndDelete({ _id: userId });
  res.json(deletedUser);
};

exports.addUserToReview = async (req, res, next) => {
  const { targetUserId, userId } = req.body;
  const user = await User.findOneAndUpdate(
    { _id: targetUserId, "usersToReview": { $ne: userId } },
    { $push: { "usersToReview": userId } },
    { new: true }
  );
  res.json(user);
};