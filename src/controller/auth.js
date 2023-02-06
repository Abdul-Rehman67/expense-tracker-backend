const { createUser, login } = require("../services/auth");
const { response } = require("../dto/send.response");
const tokenService = require("../services/tokenService");

const createUserController = async (req, res) => {
  const payload = req.body;

  let create = await createUser(payload);
  console.log("create", create);
  if (create.userExits && create.error) {
    res.send(response(false, "An error occured", {}));
  }
  if (!create.userExits) {
    res.send(response(true, "create successfully", {}));
  } else {
    res.send(response(false, "User Already exists", {}));
  }
};
const loginController = async (req, res) => {
  const payload = req.body;
  console.log(payload);
  const user = await login(payload);
  if (!user) {
    return res.send(response(false, "Incorrect username password", {}));
  } else {
    const tokens = await tokenService.generateAuthTokens(user);
    console.log("tokens",tokens)
    return res.send(
      response(true, "found success", { user: user, token: tokens })
    );
  }
};
const test = async (req,res) =>{
  console.log(req.email)

} 
module.exports = { createUserController, loginController,test };
