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

exports.addFeedback = async (req, res, next) => {
  const { userId, feedback } = req.body;
  const { usersToReview } = req.user;
  if (!usersToReview || !usersToReview.length || !canReviewUser(userId, usersToReview)) {
    return res.status(403).json({ message: "You cannot review this employee" });
  }
  const updateObj = { user: req.user._id, feedback };
  const user = await User.findOneAndUpdate(
    { _id: userId, "feedbacks.user": { $ne: req.user._id } },
    { $push: { "feedbacks": updateObj } },
    { new: true }
  );
  if (user) {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { "usersToReview": user._id } }
    );
  }
  res.send(user);
};

exports.getFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const user = await User.findOne(
    { "feedbacks._id": feedbackId }
  );
  const feedback = user.feedbacks.find(feedback => feedback.id === feedbackId);
  res.json(feedback);
};

exports.deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const user = await User.findOneAndUpdate(
    { "feedbacks._id": feedbackId },
    { $pull: { "feedbacks": { "_id": feedbackId } } },
    { new: true }
  );
  res.json(user);
};

exports.editFeedback = async (req, res, next) => {
  const { feedbackId } = req.params;
  const { message } = req.body;
  const user = await User.findOneAndUpdate(
    { "feedbacks._id": feedbackId, feedbacks: { $elemMatch: { "_id": feedbackId } } },
    { $set: { "feedbacks.$.feedback": message } },
    { new: true }
  );
  res.json(user);
};

const canReviewUser = (userId, usersToReview = []) => {
  for (let i = 0; i < usersToReview.length; i++) {
    if (usersToReview[i]._id == userId) {
      return true;
    }
  }
  return false;
};
