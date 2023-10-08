const jwt = require("jsonwebtoken");
const service = require("../Services/userService");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY || "This is a secret key";

const Authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    let token = "";
    if (bearerToken && bearerToken.startsWith("Bearer")) {
      token = bearerToken.split(" ")[1];
    } else {
      token = bearerToken;
    }
    const tokenPayload = jwt.verify(token, secretKey);
    req.user = await service.getById(tokenPayload.id);
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Unauthorized",
    });
  }
};

module.exports = { Authorize };
