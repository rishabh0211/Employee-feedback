const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      maxlength: 200
    },
    by: {
      type: ObjectId,
      ref: "User"
    },
    from: {
      type: ObjectId,
      ref: "User"
    }
  }
);

const prePopulateUsers = function(next) {
  this.populate("by", "_id name email");
  this.populate("from", "_id name email");
  next();
};

feedbackSchema.pre("findOne", prePopulateUsers);


module.exports = mongoose.model("Feedback", feedbackSchema);