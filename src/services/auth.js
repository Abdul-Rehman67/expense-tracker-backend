const userSchema = require("../models/User");
const { getUserByEmail, isPasswordMatch } = require("./userService");
const bcrypt = require("bcrypt");

const login = async (payload) => {
  const user = await getUserByEmail(payload.email);
  if (!user || !(await isPasswordMatch(payload.password,payload.email))) {
    return false
  }
  return user;
};

const createUser = async (payload) => {
  try {
    let user = await getUserByEmail(payload.email);
    if (!user) {
      payload.password = await bcrypt.hash(payload.password, 8);
      let userHaveMoneyIn = [
        { name: "cash", amount: 0 },
        { name: "account", amount: 0 },
        { name: "savings", amount: 0 },
      ];
      let userCategory = [
        { name: "Groceries", value:"groceries" },
        { name: "Rent", value: "rent" },
        { name: "Shopping", value: "shopping" },
        { name: "Utilities", value: "utilities" },
      ];
      payload = { ...payload, userHaveMoneyIn}
      payload = { ...payload, userCategory}
      let createUser = await userSchema.create(payload);
      if (createUser) {
        return { userExits: false };
      }
    } else {
      return { userExits: true };
    }
  } catch (e) {
    console.log(e);
    return { userExits: false, error: e.message };
  }
};
module.exports = { login, createUser };
