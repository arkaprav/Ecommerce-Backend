const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateAdmin = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("Admin is not authorized or token is missing");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not authorized");
        }
        req.admin = decoded.admin;
        next();
      });
  }
});

module.exports = validateUser;