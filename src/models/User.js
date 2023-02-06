const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userHaveMoneyIn: {
    type: [Object],
    of: new mongoose.Schema({}),
  },
  userCategory: {
    type: [Object],
    of: new mongoose.Schema({}),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
