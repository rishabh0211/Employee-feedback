const bcrypt = require("bcryptjs");
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
    // usersReviewed: [{ type: ObjectId, ref: "User" }],
    usersToReview: [{ type: ObjectId, ref: "User" }],
    // feebacks: [{ type: ObjectId, ref: "Feedback" }],
    feedbacks: [
      {
        user: {
          type: ObjectId,
          ref: "User"
        },
        feedback: {
          type: String,
          required: true,
          maxlength: 200
        }
      }
    ],
    admin: Boolean
  },
  { timestamps: true }
);

const autoPopulateReviewUsers = function (next) {
  // this.populate("usersReviewed", "_id name email");s
  this.populate("usersToReview", "_id name email");
  this.populate("feedbacks.user", "_id name email");
  next();
};
userSchema.pre("findOne", autoPopulateReviewUsers);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

// Hash the plain text password before saving :: Mongoose middleware
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new Error('Email must be unique'));
  } else {
    next(error);
  }
});

// userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
// userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model("User", userSchema);