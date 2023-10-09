const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRET_KEY || "This is a secret key";
const bcrypt = require("bcrypt");

const checkPassword = (encryptedPassword, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isValid) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(isValid);
    });
  });
};

const createToken = (payload) =>
  jwt.sign(payload, secretKey, { expiresIn: "1d" });

module.exports = { checkPassword, createToken };
