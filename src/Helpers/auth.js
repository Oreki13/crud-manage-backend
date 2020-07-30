const jwt = require("jsonwebtoken");
const MiscHelper = require("../Helpers/helpers");
const Models = require("../Models/users");

const allowedAccess = process.env.REQUEST_HEADERS;

module.exports = {
  authInfo: (req, res, next) => {
    const headerAuth = req.headers["authorization"];
    const headerSecret = req.headers["x-access-token"];

    if (headerAuth !== allowedAccess) {
      return MiscHelper.response(
        res,
        null,
        401,
        "Unauthorized, Need Authentication!"
      );
    } else if (typeof headerSecret === "undefined") {
      console.log("Authentication Valid!");
      next();
    } else {
      const bearerToken = headerSecret.split(" ");
      const token = bearerToken[0];
      req.token = token;
      console.log("Token stored!");
      next();
    }
  },

  accesstoken: (req, res, next) => {
    const secretKey = process.env.SECRET_KEY;
    const accessToken = req.params.token;

    jwt.verify(accessToken, secretKey, (err, decoded) => {
      if (err && err.name === "TokenExpiredError")
        return MiscHelper.response(res, "Token expired", 200, true);

      if (err && err.name === "JsonWebTokenError")
        return MiscHelper.response(res, "Invalid Token", 200, true);

      console.log("Access Granted!");

      return MiscHelper.response(res, decoded, 200, false);
    });
  },
};
