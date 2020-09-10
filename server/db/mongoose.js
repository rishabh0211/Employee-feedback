const mongoose = require("mongoose");

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions)
  .then(() => console.log("Connected to database"))
  .catch(err => console.log("Database connection failed. Error: ", err));