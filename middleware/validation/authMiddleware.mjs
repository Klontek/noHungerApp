import userModel from "../../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const isAuthorize = async (req, res, next) => {
  const jwt_secret = process.env.SECRET;

  if (req.headers && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    try {
      const decode = jwt.verify(token, jwt_secret);
      console.log("Decoded Token:", decode);

      const user = await userModel.findById(decode.userId).select("+token");
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found, unauthorized access!",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.json({
          success: false,
          message: "session expired try sign in!",
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.json({
          success: false,
          message: "unauthorized access!",
        });
      }

      res
        .status(404)
        .json({ success: false, message: "Internal server error!" });
    }
  } else {
    res.status(200).json({ success: true, message: "unauthorized access!" });
  }
};
