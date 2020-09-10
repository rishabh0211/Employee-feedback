const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: "Email is required",
      trim: true,
      lowercase: true,
      unique: true,
    },
    name: {
      type: String,
      trim: true,
      minlength: 2,
      maxlength: 30,
      required: "Name is required"
    },
    password: {
      type: String,
      trim: true,
      validate(value) {
        if (value.length < 7) {
          throw new Error('Password length should be greater than 6!');
        }
        if (value.toLowerCase().includes('password')) {
          throw new Error('Password should not contain the word password in it!');
        }
      }
    },
    usersReviewed: [{ type: ObjectId, ref: "User" }],
    usersToReview: [{ type: ObjectId, ref: "User" }],
    feebacks: [{type: ObjectId, ref: "Feedback"}],
    admin: Boolean
  },
  { timestamps: true }
);

const autoPopulateReviewUsers = function (next) {
  this.populate("usersReviewed", "_id name email");
  this.populate("usersToReview", "_id name email");
  this.populate("feebacks", "_id by from");
  next();
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.pre("findOne", autoPopulateReviewUsers);

// userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
// userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);