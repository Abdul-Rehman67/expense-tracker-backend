const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Token = mongoose.model("Token");

const userChecker = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  // console.log("authorizationHeader",authorizationHeader)

  if (!authorizationHeader) {
    return res.status(401).send({ error: "No authorization header" });
  }

  try {
    const decoded = jwt.verify(authorizationHeader, process.env.JWT_SECRET);
    const tokenRecord = await Token.find({ user: decoded.sub }).sort({_id:-1}).limit(1)
    // console.log(tokenRecord)
    // console.log(tokenRecord,tokenRecord[tokenRecord.length-1].token !== authorizationHeader )
    if (!tokenRecord || tokenRecord[0].token !== authorizationHeader) {
      return res.status(401).send({ error: "invalid token" });
    }

    req.email = decoded.sub;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: "Invalid token" });
  }
};
module.exports = { userChecker };
