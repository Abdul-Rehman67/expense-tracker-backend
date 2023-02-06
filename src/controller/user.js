const { getUserByEmail } = require("../services/userService");
const { response } = require("../dto/send.response");
const { updateUserBalance } = require("../services/user");

const getUserController = async (req, res) => {
  const emailId = req.email;
  let data = await getUserByEmail(emailId);
  // console.log(data);
  if (data) {
    return res.send(response(true, "Data Found", { data: data }));
  } else {
    return res.send(response(false, "Not Found"));
  }
};
const updateBalanceController = async (req, res) => {
  const emailId = req.email;
  const payload = req.body;
  // console.log("payload", payload);
  let data = await updateUserBalance(emailId, payload);
  console.log(data);
  if (data) {
    return res.send(response(true, "Updated success", { data: data }));
  } else {
    return res.send(response(false, "An error occured"));
  }
};
module.exports = { getUserController, updateBalanceController };
