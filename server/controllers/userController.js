const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.getUser = async (req, res) => {
  res.send("Hello");
};