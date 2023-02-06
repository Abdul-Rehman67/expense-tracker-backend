const mongoose = require("mongoose");
const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
});
const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
