const userSchema = require("../models/User");
const bcrypt = require("bcrypt")
const getUserByEmail = async (email) => {
  // console.log(email);
  return await userSchema.findOne({ email: email });
};
const isPasswordMatch = async (password, email) => {
  let user = await getUserByEmail(email);
  // console.log(user);
  if (user) {
    let compare = await bcrypt.compare(password, user.password);
    console.log(compare)
    return compare;
  } 
};

module.exports = { getUserByEmail, isPasswordMatch };
